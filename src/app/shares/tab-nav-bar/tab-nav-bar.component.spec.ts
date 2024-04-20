import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavBarComponent } from './tab-nav-bar.component';

describe('TabNavBarComponent', () => {
  let component: TabNavBarComponent;
  let fixture: ComponentFixture<TabNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
