import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';
import { SectorService } from 'src/app/services/sector.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-major-operation',
  templateUrl: './major-operation.component.html',
  styleUrls: ['./major-operation.component.scss']
})
export class MajorOperationComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();

  majorId: string;
  form: FormGroup;
  isLoading = false;

  latestHtml: any;
  quillEditorRef: any;
  sectors: any;

  params: Pagination = {
    page: 1,
    limit: 0,
    search: null
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private majorService: MajorService,
    private snackbarService: SnackbarService,
    private sectorService: SectorService
  ) {
    this.majorId = this.route.snapshot.paramMap.get('majorId');
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.getSectors();
    if (!this.majorId) return;
    this.getInfo();
  }

  initFormGroup(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      name_en: [''],
      code: [''],
      sectors: ['']
    });
  }

  getInfo(): void {
    this.majorService
      .getById(this.majorId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.patchFormGroup(res);
        }
      });
  }

  getSectors(): void {
    this.sectorService.getMany(this.params).subscribe( res =>{
      this.sectors = res.list;
    })
  }

  patchFormGroup(item: Major): void {
    this.form.patchValue({
      name: item?.name,
      name_en: item?.name_en,
      code: item?.code,
      sectors: item?.sectors?._id
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
      _id: this.majorId ? this.majorId : null,
      name: value.trim()
    };
    this.majorService
      .checkNameExist(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (res['exist']) {
          this.form.controls['name'].setErrors({ existed: true });
        }
      });
  }

  create(): void {
    this.majorService
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
    this.majorService
      .update(this.majorId, this.form.value)
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

    if (!this.majorId) {
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

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string): void {
    this.params.search = value;
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSectors();
    }, 500);
  }
}
