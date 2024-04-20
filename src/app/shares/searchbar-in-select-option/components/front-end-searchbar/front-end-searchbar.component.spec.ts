import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndSearchbarComponent } from './front-end-searchbar.component';

describe('FrontEndSearchbarComponent', () => {
  let component: FrontEndSearchbarComponent;
  let fixture: ComponentFixture<FrontEndSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontEndSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
