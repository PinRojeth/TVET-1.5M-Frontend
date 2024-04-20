import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { LocalStorageEnum } from 'src/app/models/enums/local-storage.enum';
import { ChildItem, MenuItem } from 'src/app/models/menu-item';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleCheckerService } from 'src/app/services/role-checker.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { MENU } from './menu';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('1 => 0', animate('10ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class ContainerComponent extends Unsubscribe implements OnInit {
  pAdmin = pAdmin;
  menu!: MenuItem[];
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  isFirefox: boolean;
  sidebarMode: any;
  mobileQuery!: boolean;
  smallScreen!: boolean;
  authUser!: object;
  isAuth!: boolean;
  account: any;
  authSubscribe: any;
  menuAdmin!: MenuItem[];
  langs: { [key: string]: string } = {
    'km': 'ខ្មែរ',
    'en': 'English'
  };
  browserLang: string;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  /**
   * @config order of languages
   */
  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  };

  constructor(
    public route: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private breakpointObserver: BreakpointObserver,
    private localStorageService: LocalStorageService,
    private roleCheckerService: RoleCheckerService,
    private platform: Platform,
    private translate: TranslateService
  ) {
    super();
    this.isFirefox = platform.FIREFOX;

    this.browserLang = localStorageService.get(LocalStorageEnum.language) || 'km';

    this.menuAdmin = MENU;
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg-icon-set.svg')
    );
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/side-nav-icon-set.svg')
    );
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/action-icons.svg')
    );
    this.authSubscribe = this.authService.authChange$.subscribe(isAuth => {
      this.isAuth = isAuth;
      if (this.isAuth) {
        this.profileService
          .getAccountInfo()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            this.account = data;
            localStorage.setItem('account', JSON.stringify(data));
            this.profileService.staffId = data._id;
            this.localStorageService.setArray(LocalStorageEnum.permissions, data?.accounts?.roles?.permissions ?? data?.users?.roles?.permissions);
            this.userDataService.changeUserData(data);
            this.initSidenav();
          });
      }
    });
    this.initSidenav();
  }

  ngOnInit(): void {
    this.onSmallScreen();
    this.breakpointObserver.observe([Breakpoints.Large]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mobileQuery = false;
      }
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.browserLang = language;
    this.localStorageService.set(LocalStorageEnum.language, language);
  }

  initSidenav() {
    this.menu = [];
    for (let i = 0; i < this.menuAdmin.length; i++) {
      if (this.menuAdmin[i].child.length > 0) {
        let childs: ChildItem[] = [];
        for (let j = 0; j < this.menuAdmin[i]?.child.length; j++) {
          if (this.menuAdmin[i]?.child[j].permissions.length > 0) {
            if (this.checkPermission(this.menuAdmin[i]?.child[j].permissions)) {
              childs.push(this.menuAdmin[i].child[j]);
            }
          } else {
            childs.push(this.menuAdmin[i].child[j]);
          }
        }

        if (childs.length > 0) {
          let m: MenuItem = JSON.parse(JSON.stringify(this.menuAdmin[i]));
          m.child = JSON.parse(JSON.stringify(childs));
          this.menu.push(m);
        }
      } else {
        // check permission menu without children
        if (this.menuAdmin[i].permissions.length > 0) {
          if (this.checkPermission(this.menuAdmin[i].permissions)) {
            this.menu.push(this.menuAdmin[i]);
          }
        } else {
          this.menu.push(this.menuAdmin[i]);
        }
      }
    }
  }

  public checkPermission(arr: string[]): boolean {
    let perms: string[] = this.roleCheckerService.GetPermissions();

    if (perms == undefined || perms.length <= 0) {
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      if (perms.filter(e => e == arr[i]).length > 0) {
        return true;
      }
    }
    return false;
  }

  isChildActive(childs: MenuItem[] | ChildItem[]): boolean {

    for (let i = 0; i < childs.length; i++) {
      const url = typeof childs[i].route === 'string' ? childs[i].route : this.router.createUrlTree(childs[i].route);
      const matchOptions: IsActiveMatchOptions = {
          paths: 'subset',
          matrixParams: 'subset',
          queryParams: 'subset',
          fragment: 'ignored'
        };
      const isActive = this.router.isActive(url, matchOptions);

      if (isActive) {
        return true;
      }
    }
    
    // for (let i = 0; i < childs.length; i++) {
    //   if (this.router.isActive(this.router.createUrlTree(childs[i].route), false)) {
    //     return true;
    //   }
    // }
    return false;
  }

  onResize(): void {
    if (window.innerWidth <= 959) {
      this.mobileQuery = true;
      this.isExpanded = false;
    }
    if (window.innerWidth > 959 && window.innerWidth <= 1280) {
      this.isExpanded = false;
      this.mobileQuery = false;
    }
  }
  onSmallScreen(): void {
    if (window.innerWidth <= 959) {
      this.mobileQuery = true;
      this.isExpanded = false;
    }
    if (window.innerWidth > 959 && window.innerWidth <= 1280) {
      this.isExpanded = false;
      this.mobileQuery = false;
    }
  }

  toggleSideNav(): void {
    if (this.mobileQuery) {
      this.sidenav.toggle();
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  logout(): void {
    this.isAuth = false;
    this.authSubscribe.unsubscribe();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
