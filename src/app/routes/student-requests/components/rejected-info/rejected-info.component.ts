import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-rejected-info',
  templateUrl: './rejected-info.component.html',
  styleUrls: ['./rejected-info.component.scss']
})
export class RejectedInfoComponent implements OnInit {

  studentRequestId: string;
  student: any;

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private studentService: StudentService,
    private snackbarService: SnackbarService,
  ) {
    this.studentRequestId = this.route.snapshot.paramMap.get('studentRequestId');
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.studentService.getApprovedOne(this.studentRequestId, {query_poor_data: true}).subscribe({
      next: (res) => {
        this.student = res;
      }
    });
  }

}
