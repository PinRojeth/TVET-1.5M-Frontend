import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchbarComponent } from './api-searchbar.component';

describe('ApiSearchbarComponent', () => {
  let component: ApiSearchbarComponent;
  let fixture: ComponentFixture<ApiSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
