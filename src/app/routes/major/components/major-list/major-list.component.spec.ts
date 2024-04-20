import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorListComponent } from './major-list.component';

describe('MajorListComponent', () => {
  let component: MajorListComponent;
  let fixture: ComponentFixture<MajorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajorListComponent]
    });
    fixture = TestBed.createComponent(MajorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
