import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceListComponent } from './human-resource-list.component';

describe('HumanResourceListComponent', () => {
  let component: HumanResourceListComponent;
  let fixture: ComponentFixture<HumanResourceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanResourceListComponent]
    });
    fixture = TestBed.createComponent(HumanResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
