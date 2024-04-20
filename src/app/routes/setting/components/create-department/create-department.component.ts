import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent {
  private readonly destroyer$ = DESTROYER$();

  departmentId: string;
  form: FormGroup;
  isLoading = false;

  latestHtml: any;
  info: Department;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private snackbarService: SnackbarService
  ) {
    this.departmentId = this.route.snapshot.paramMap.get('id');
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFormGroup();
    if (!this.departmentId) return;
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
    this.departmentService
      .getById(this.departmentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.info = res;
          this.patchFormGroup(res);
        }
      });
  }

  patchFormGroup(item: Department): void {
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
      _id: this.departmentId ? this.departmentId : null,
      name: value.trim()
    };
    this.departmentService
      .checkNameExist(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (res['exist']) {
          this.form.controls['name'].setErrors({ existed: true });
        }
      });
  }

  create(data): void {
    this.departmentService
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
    this.departmentService
      .update(this.departmentId, data)
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

    if (!this.departmentId) {
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
