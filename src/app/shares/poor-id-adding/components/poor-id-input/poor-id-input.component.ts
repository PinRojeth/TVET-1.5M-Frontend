import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { ApplyStudent, FamilyMember } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-poor-id-input',
  templateUrl: './poor-id-input.component.html',
  styleUrls: ['./poor-id-input.component.scss']
})
export class PoorIdInputComponent {
  constructor(public dialogRef: MatDialogRef<PoorIdInputComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  form: FormGroup;

  private readonly destroyer$ = DESTROYER$();

  private readonly studentService = inject(StudentService);

  payload: ApplyStudent;

  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.date_birth',
      dataKey: 'dob',
      custom: true
    },
    {
      name: 'Relation To Head',
      dataKey: 'rth',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<any> = {
    page: 1,
    limit: 0,
    list: [],
    total: 0
  };

  family_members: FamilyMember[];
  appliedMember: FamilyMember;

  isSearch: boolean;
  isLoading: boolean = false;

  searchForm: FormControl = new FormControl(null, Validators.required);

  selectedStudent: FamilyMember;

  onSearch(): void {
    if (this.searchForm.invalid) return;
    this.isSearch = true;
    let value: string = this.searchForm.value;
    this.studentService
      .checkPoorData({ poor_id: value })
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.payload = res;

          this.family_members = this.payload.family_members;
          this.tableData = {
            ...this.tableData,
            list: this.payload.family_members
          };
          this.isSearch = false;
        },
        error: err => {
          this.isSearch = false;
        }
      });
  }

  chooseMember(data: FamilyMember): void {
    this.selectedStudent = data;
  }

  onSubmit(): void {
    if (this.searchForm.invalid) return this.searchForm.markAsTouched();
    if (!!this.selectedStudent)
      this.dialogRef.close({ poor_id: this.searchForm.value, poor_member_uuid: this.selectedStudent.uuid });
  }
}
