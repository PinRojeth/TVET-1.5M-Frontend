import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-finish-detail',
  templateUrl: './student-finish-detail.component.html',
  styleUrls: ['./student-finish-detail.component.scss']
})
export class StudentFinishDetailComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();

  private readonly route = inject(ActivatedRoute);
  public readonly translate = inject(TranslateService);
  private studentService = inject(StudentService);

  studentId: string = this.route.snapshot.params.studentId;
  tab: string = this.route.snapshot.params.tab;

  student: any;
  readonly studentFinishEnum = StudentFinishEnum;

  @Output() studentEvent: EventEmitter<Student> = new EventEmitter();

  @Input() set reload(status: boolean) {
    if (status) this.onLoad();
  }

  uuidPerm = pAdmin.adminAction;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.studentService
      .getOne(this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.student = res;
          this.studentEvent.emit(res);
        }
      });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
