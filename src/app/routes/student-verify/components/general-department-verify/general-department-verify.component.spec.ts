import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDepartmentVerifyComponent } from './general-department-verify.component';

describe('GeneralDepartmentVerifyComponent', () => {
  let component: GeneralDepartmentVerifyComponent;
  let fixture: ComponentFixture<GeneralDepartmentVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralDepartmentVerifyComponent]
    });
    fixture = TestBed.createComponent(GeneralDepartmentVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
