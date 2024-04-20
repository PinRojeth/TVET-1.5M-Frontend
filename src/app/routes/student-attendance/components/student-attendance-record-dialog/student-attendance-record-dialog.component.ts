import { formatDate } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { AttendanceData, AttendanceDate, AttendanceStudentRecord } from 'src/app/models/attendance';
import { AttendanceType } from 'src/app/models/enums/enumConstant';
import { Shift } from 'src/app/models/shift';
import { LoadingService } from 'src/app/services/loading.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { AttendanceCountPipe } from 'src/app/shares/attendance-count/attendance-count.pipe';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-student-attendance-record-dialog',
  templateUrl: './student-attendance-record-dialog.component.html',
  styleUrls: ['./student-attendance-record-dialog.component.scss'],
  providers: [AttendanceCountPipe]
})
export class StudentAttendanceRecordDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<StudentAttendanceRecordDialogComponent>);
  private readonly studentAttendanceService = inject(StudentAttendanceService);
  readonly loadingService = inject(LoadingService);
  private readonly attendanceCountPipe = inject(AttendanceCountPipe);

  tableDataSource = new MatTableDataSource<AttendanceData>();
  displayedColumns: string[] = ['date'];

  filterParams: Params = {};
  params: Pagination = {
    limit: 0,
    page: 1,
    search: ''
  };

  requestUrl: string = this.studentAttendanceService.path + '/student';

  date: string[];

  attendanceType: typeof AttendanceType = AttendanceType;

  attendanceDate: AttendanceDate[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      student: string;
      data: any[];
      activeDate: AttendanceStudentRecord;
      disable?: boolean;
      shift_times?: Shift[];
    }
  ) {
    this.onLoad();
  }

  onSubmit(): void {
    const DATA: AttendanceDate[] = [];
    let allAttendance: number[] = [];

    //divide shift time in to array
    for (const item of this.data.shift_times) {
      DATA.push({
        shift_times: item._id,
        attendance_data: []
      });
    }

    //push date of their own shift time
    for (const data of this.tableDataSource.data) {
      for (const item of DATA) {
        if (!!data.dateArray[item.shift_times]?.attendance_type) {
          item.attendance_data.push({
            date: data.dateArray[item.shift_times].date,
            attendance_type: data.dateArray[item.shift_times]?.attendance_type
          });

          allAttendance.push(data.dateArray[item.shift_times]?.attendance_type);
        }
      }
    }

    let present: number = allAttendance.filter(fil => fil === this.attendanceType.PRESENT)?.length ?? 0;
    let absent: number = allAttendance.filter(fil => fil === this.attendanceType.ABSENT)?.length ?? 0;
    let permission: number = allAttendance.filter(fil => fil === this.attendanceType.PERMISSION)?.length ?? 0;
    let shiftLength: number = this.data?.shift_times?.length;

    this.dialogRef.close({
      present: this.attendanceCountPipe.transform(present, shiftLength),
      absent: this.attendanceCountPipe.transform(absent, shiftLength),
      permission: this.attendanceCountPipe.transform(permission, shiftLength),
      data: DATA
    });
  }

  onLoad(): void {
    let requireDate: AttendanceStudentRecord = this.data.activeDate;
    let activeDate: Date = new Date(requireDate.year, requireDate.month - 1, 1);
    let data: AttendanceData[] = [];

    //merge dates in current month with dates from parent
    while (activeDate.getMonth() + 1 === requireDate.month) {
      let formattedDate: string = this.formattedDate(activeDate);
      let formattedDateDisplay: string = formatDate(new Date(activeDate), 'dd-MM-yyyy', 'en-US');

      let dataDate: AttendanceData = {
        date: formattedDate,
        attendance_type: null,
        dateDisplay: formattedDateDisplay
      };

      //insert shift time to data table
      let dateArray: any;
      if (this.data?.shift_times?.length > 0) {
        for (const item of this.data.shift_times) {
          dateArray = { ...dateArray, [item._id]: { ...dataDate, shift_times: item._id } };

          //show selected date
          for (const data of this.data?.data) {
            if (data.shift_times === item._id) {
              for (const attendance of data.attendance_data) {
                if (attendance?.date === dateArray[item._id]?.date)
                  dateArray[item._id].attendance_type = attendance.attendance_type;
              }
            }
          }
        }
      }

      data.push({
        ...dataDate,
        dateArray: dateArray
      });

      activeDate.setDate(activeDate.getDate() + 1);
    }

    //set date to shift time
    if (this.data?.shift_times?.length > 0) {
      this.attendanceDate = [];
      this.displayedColumns = ['date'];
      for (const item of this.data.shift_times) {
        this.attendanceDate.push({ shift_times: item._id, attendance_data: data });
        this.displayedColumns.push(item._id);
      }
    }

    this.tableDataSource = new MatTableDataSource(data);
  }

  formattedDate(date: string | Date): string {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

  onCheck(event: MatCheckboxChange, data: AttendanceData, type: number): void {
    if (event.checked) data.attendance_type = type;
    else data.attendance_type = null;
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
