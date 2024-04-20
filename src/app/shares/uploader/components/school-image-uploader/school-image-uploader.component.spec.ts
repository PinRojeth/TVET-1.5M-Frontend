import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolImageUploaderComponent } from './school-image-uploader.component';

describe('SchoolImageUploaderComponent', () => {
  let component: SchoolImageUploaderComponent;
  let fixture: ComponentFixture<SchoolImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolImageUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
