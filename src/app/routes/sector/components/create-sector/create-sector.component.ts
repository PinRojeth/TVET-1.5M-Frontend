import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.scss']
})
export class CreateSectorComponent {
  private readonly destroyer$ = DESTROYER$();

  sectorId: string;
  form: FormGroup;
  isLoading = false;

  latestHtml: any;
  quillEditorRef: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sectorService: SectorService,
    private snackbarService: SnackbarService
  ) {
    this.sectorId = this.route.snapshot.paramMap.get('sectorId');
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFormGroup();
    if (!this.sectorId) return;
    this.getInfo();
  }

  initFormGroup(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      name_en: [''],
      code: ['']
    });
  }

  getInfo(): void {
    this.sectorService
      .getById(this.sectorId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.patchFormGroup(res);
        }
      });
  }

  patchFormGroup(item: Sector): void {
    this.form.patchValue({
      name: item?.name,
      name_en: item?.name_en,
      code: item?.code
    });
  }

  //* Check Name Already Existed
  onCheckExist(value: string): void {
    if (value) {
      this.startCheckExist(value);
    }
  }

  searchExistTimer: any;
  startCheckExist(value: string): void {
    clearTimeout(this.searchExistTimer);
    this.searchExistTimer = setTimeout(() => {
      this.checkExisted(value);
    }, 500);
  }

  checkExisted(value: string): void {
    const data = {
      _id: this.sectorId ? this.sectorId : null,
      name: value.trim()
    };
    this.sectorService
      .checkNameExist(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (res['exist']) {
          this.form.controls['name'].setErrors({ existed: true });
        }
      });
  }

  create(): void {
    this.sectorService
      .create(this.form.value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.router.navigate(['../info', res._id], { relativeTo: this.route });
        }
      });
  }

  update(): void {
    this.sectorService
      .update(this.sectorId, this.form.value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.router.navigate(['../../info', res._id], { relativeTo: this.route });
        }
      });
  }

  onSubmit(): void {
    if (!this.form.valid) return;
    this.isLoading = true;

    if (!this.sectorId) {
      // create
      this.create();
    } else {
      // update
      this.update();
    }
  }

  changedEditor(event: any) {
    if (event.event == 'text-change') {
      this.latestHtml = event.html;
    }
  }
}
