import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorInfoComponent } from './major-info.component';

describe('MajorInfoComponent', () => {
  let component: MajorInfoComponent;
  let fixture: ComponentFixture<MajorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajorInfoComponent]
    });
    fixture = TestBed.createComponent(MajorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
