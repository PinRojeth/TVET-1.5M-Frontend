import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import EnumConstant, { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { RequestTimeLine } from 'src/app/models/student';
import { StudentVerifyService } from 'src/app/services/student-verify.service';

@Component({
  selector: 'app-student-verify-timeline',
  templateUrl: './student-verify-timeline.component.html',
  styleUrls: ['./student-verify-timeline.component.scss']
})
export class StudentVerifyTimelineComponent {
  private readonly destroyer$ = DESTROYER$();
  private readonly route = inject(ActivatedRoute);
  private studentService = inject(StudentVerifyService);

  studentId: string = this.route.snapshot.params.studentId;
  requestingStatus: number = EnumConstant.REQUESTING;

  timeline: RequestTimeLine[];

  readonly studentFinishEnum = StudentFinishEnum;

  convertKey(key: string): string {
    return key.replace(/ /g, '_').toLowerCase();
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.studentService
      .getTimeLine(this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.timeline = res.list;
        }
      });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
