import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDepartmentVerifyTabComponent } from './general-department-verify-tab.component';

describe('GeneralDepartmentVerifyTabComponent', () => {
  let component: GeneralDepartmentVerifyTabComponent;
  let fixture: ComponentFixture<GeneralDepartmentVerifyTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralDepartmentVerifyTabComponent]
    });
    fixture = TestBed.createComponent(GeneralDepartmentVerifyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
