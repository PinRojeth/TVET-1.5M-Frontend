import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Shift } from 'src/app/models/shift';
import { ShiftService } from 'src/app/services/shift.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent {
  private readonly destroyer$ = DESTROYER$();

  shiftId: string;
  form: FormGroup;
  isLoading = false;

  latestHtml: any;
  quillEditorRef: any;
  shiftTime = [];
  shiftTimes = [];
  id: any;
  info: Shift;

  mapShift: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private shiftService: ShiftService,
    private snackbarService: SnackbarService
  ) {
    this.shiftId = this.route.snapshot.paramMap.get('id');
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFormGroup();
    if (!this.shiftId) return;
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
    this.shiftService
      .getById(this.shiftId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.info = res;
          this.patchFormGroup(res);
        }
      });
  }

  patchFormGroup(item: Shift): void {
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
      _id: this.shiftId ? this.shiftId : null,
      name: value.trim()
    };
    this.shiftService
      .checkNameExist(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (res['exist']) {
          this.form.controls['name'].setErrors({ existed: true });
        }
      });
  }

  create(data): void {
    this.shiftService
      .create(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.router.navigate(['../info', res._id], { relativeTo: this.route });
        }
      });
  }

  update(data): void {
    this.shiftService
      .update(this.shiftId, data)
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
    
    const formValue = this.form.value;
    const data = {
      ...formValue
    };

    if (!this.shiftId) {
      // create
      this.create(data);
    } else {
      // update
      this.update(data);
    }
  }

  changedEditor(event: any) {
    if (event.event == 'text-change') {
      this.latestHtml = event.html;
    }
  }
}
