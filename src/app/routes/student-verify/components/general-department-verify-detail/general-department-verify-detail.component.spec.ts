import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDepartmentVerifyDetailComponent } from './general-department-verify-detail.component';

describe('GeneralDepartmentVerifyDetailComponent', () => {
  let component: GeneralDepartmentVerifyDetailComponent;
  let fixture: ComponentFixture<GeneralDepartmentVerifyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralDepartmentVerifyDetailComponent]
    });
    fixture = TestBed.createComponent(GeneralDepartmentVerifyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
