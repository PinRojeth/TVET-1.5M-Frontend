import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Course } from 'src/app/models/course';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { School } from 'src/app/models/school';
import { ApplyStudent, FamilyMember } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { CourseService } from 'src/app/services/course.service';
import { SchoolService } from 'src/app/services/school.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-pending',
  templateUrl: './create-pending.component.html',
  styleUrls: ['./create-pending.component.scss']
})
export class CreatePendingComponent {
  data: ApplyStudent;
  address: Address;

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
  tableData: BaseDatatable<Partial<any>> = {
    page: 1,
    limit: 0,
    list: [],
    total: 0
  };

  family_members: FamilyMember[];
  appliedMember: FamilyMember;
  form: FormGroup;
  schools: School[];
  courses: Course[];
  courseBySchool: Course[] = [];
  isSearch: boolean;
  isLoading: boolean = false;

  today: Date = new Date();
  currentYear: number = new Date().getFullYear();
  currentMaxDate: Date = new Date(this.currentYear, 12, 0);
  currentMinDate: Date = new Date(this.currentYear, 0, 1);
  minDate: Date = new Date(this.currentMinDate.setFullYear(this.currentYear - 35));
  maxDate: Date = new Date(this.currentMaxDate.setFullYear(this.currentYear - 15));

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private studentService: StudentService,
    private snackbarService: SnackbarService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.getSchools();
    // this.getCourses();
  }
  get schoolsCtr(): FormControl {
    return this.form.get('schools') as FormControl;
  }

  search(value: string) {
    if (!value) return;
    this.isSearch = true;
    this.studentService.checkPoorData({ poor_id: value }).subscribe({
      next: res => {
        this.data = res;
        this.address = this.data?.address;

        this.family_members = this.data.family_members;
        this.tableData = {
          ...this.tableData,
          list: this.family_members
        };
        this.isSearch = false;
      },
      error: err => {
        this.isSearch = false;
      }
    });
  }

  chooseMember(member: FamilyMember) {
    if (member.is_apply) return;
    for (let index = 0; index < this.family_members.length; index++) {
      const element = this.family_members[index];
      element.is_apply = false;
    }
    member.is_apply = true;
    this.appliedMember = member;
    this.initFormGroup();
    this.getSchools();
    this.patchFormGroup();
  }

  initFormGroup() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: [null, Validators.required],
      phone_number: [null, Validators.required],
      schools: ['', Validators.required],
      // apply_majors: ['', Validators.required],
      poor_id: [''],
      date_of_birth: ['', Validators.required],
      courses: ['', Validators.required],
      id_card_number: [''],
      poor_file_datas: [null],
      poor_file_datas_name: [null]
    });
  }

  getSchools() {
    this.schoolService.getSchool().subscribe(res => (this.schools = res.list));
  }

  getCourses() {
    this.courseService.getMany({ limit: 0, page: 1 }).subscribe(res => (this.courses = res.list));
  }

  patchFormGroup() {
    this.form.patchValue({
      first_name: this.appliedMember.first_name,
      last_name: this.appliedMember.last_name,
      gender: this.appliedMember.gender,
      phone_number: this.appliedMember.phone_number,
      poor_id: this.data.poor_id,
      date_of_birth: this.formattedDate(this.appliedMember.date_of_birth),
      id_card_number: this.appliedMember.id_card_number
    });
  }

  onSchoolChange(value: School) {
    /** Clear course selection */
    this.form.get('courses').setValue('');
    this.courseBySchool = value?.courses ?? [];

    // if (value.courses?.length > 0) {
    //   for (let index = 0; index < value.courses.length; index++) {
    //     const element = value.courses[index]._id as string;
    //     this.courseBySchool.push(this.getCourseName(element));
    //   }
    // }
  }

  getCourseName(id: string): Course {
    return this.courses.find(course => course._id === id);
  }

  onSubmit() {
    if (!this.form.valid) return this.form.markAllAsTouched();

    const value = this.form.value;
    const data = {
      ...value,
      schools: this.schoolsCtr.value?._id,
      date_of_birth: this.formattedDate(value.date_of_birth)
    };
    this.create(data);
  }

  create(data: any) {
    this.studentService.applyStudy(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackbarService.onShowSnackbar({ message: 'add' });
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  private formattedDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
