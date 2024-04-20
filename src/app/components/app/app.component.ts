import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageEnum } from 'src/app/models/enums/local-storage.enum';
import { LoadingService } from 'src/app/services/loading.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studio';
  isLoading = false;
  loadingTimeout: any;
  browserLang;
  constructor(
    private router: Router,
    public loadingService: LoadingService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.forceStop();
        this.loadingService.setLoading('page', true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // scroll to top on navigate finish
        // window.scrollTo({top:0})
        this.loadingService.setLoading('page', false);
        this.loadingService.url = null;
      }
    });

    translate.addLangs(['en', 'km']);
    translate.setDefaultLang('km');

    this.browserLang = localStorageService.get(LocalStorageEnum.language); //navigator.language;
    translate.use(this.browserLang.match(/en|zh-CN|km/) ? this.browserLang : 'km'); // default language 'km'
  }
}
