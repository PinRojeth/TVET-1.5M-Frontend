import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { pAdmin } from 'src/app/helpers/permission';
import { Cms } from 'src/app/models/cms';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent {
  pCms = pAdmin.landingPageCms;
  cms: Cms;
  cmsId: string;
  data: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.cmsService.getCms().subscribe({
      next: res => {
        this.cms = res;
        this.cmsId = res._id;
      }
    });
  }

  onEdit() {
    this.router.navigate(['edit', this.cmsId], { relativeTo: this.route });
  }
}
