import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import EnumConstant, { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { RequestTimeLine } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-finish-timeline',
  templateUrl: './student-finish-timeline.component.html',
  styleUrls: ['./student-finish-timeline.component.scss']
})
export class StudentFinishTimelineComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();
  private readonly route = inject(ActivatedRoute);
  public readonly translate = inject(TranslateService);
  private studentService = inject(StudentService);

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
