import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsEditComponent } from './cms-edit.component';

describe('CmsEditComponent', () => {
  let component: CmsEditComponent;
  let fixture: ComponentFixture<CmsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmsEditComponent]
    });
    fixture = TestBed.createComponent(CmsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
