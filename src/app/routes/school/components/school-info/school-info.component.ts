import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { pAdmin } from 'src/app/helpers/permission';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-info',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.scss']
})
export class SchoolInfoComponent implements OnInit {

  pSchool = pAdmin.school;
  schoolId: string;
  info: School;
  majors: string;

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    public translate: TranslateService,
  ) {

    this.schoolId = this.route.snapshot.paramMap.get('schoolId');
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.schoolService.getById(this.schoolId).subscribe({
      next: (res) => {
        this.info = res;
        this.majors = this.info?.apply_majors.map((obj) => obj.name).join(', ');
      }
    });
  }

}
