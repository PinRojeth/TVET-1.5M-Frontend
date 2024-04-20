import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
import { LoadingService } from 'src/app/services/loading.service';
import { StudentVerifyService } from 'src/app/services/student-verify.service';

@Component({
  selector: 'app-student-verify-detail',
  templateUrl: './student-verify-detail.component.html',
  styleUrls: ['./student-verify-detail.component.scss']
})
export class StudentVerifyDetailComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly route = inject(ActivatedRoute);
  public readonly translate = inject(TranslateService);
  private readonly studentService = inject(StudentVerifyService);
  private readonly loadingService = inject(LoadingService);

  studentId: string = this.route.snapshot.params.studentId;
  tab: string = this.route.snapshot.params.tab;
  poorId: string = this.route.snapshot.queryParamMap.get('poorId');

  student: Student;

  readonly studentFinishEnum = StudentFinishEnum;

  @Output() studentEvent: EventEmitter<Student> = new EventEmitter();

  @Input() set reload(status: boolean) {
    if (status) this.onLoad();
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    if (!!this.poorId) this.loadingService.setLoading('page', true);
    this.studentService
      .getById(this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.student = res;
          this.studentEvent.emit(res);

          if (!!this.poorId) this.loadingService.setLoading('page', false);
        }
      });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
