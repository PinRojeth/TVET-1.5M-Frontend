import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionPipe } from '../role/pipes/permission.pipe';
import { TabNavBar } from './tab-nav-bar';

@Component({
  selector: 'app-tab-nav-bar',
  templateUrl: './tab-nav-bar.component.html',
  styleUrls: ['./tab-nav-bar.component.scss']
})
export class TabNavBarComponent implements OnInit {
  @Input()
  links: TabNavBar[] = [];
  @Input()
  activeLink!: number;
  lastIn: number;

  @Output() selectedTabEvent = new EventEmitter<number>();

  constructor(
    // private permissionPip: PermissionPipe,
    // private router: Router,
    // private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.lastIn = this.links.length - 1;
    // this.activeLink = this.links[0].index;
    // this.activeFirstLink();
  }

  // private activeFirstLink() {
  //   this.activeLink = this.links[0].index;
  //   this.router.navigate([this.links[0].route, this.links[0].tab], { relativeTo: this.route })
  // }

  onTabSelectedIndexChange(index: number) {
    this.selectedTabEvent.emit(index);
  }
}
