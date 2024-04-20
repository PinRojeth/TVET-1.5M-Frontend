import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalStackBarComponent } from './horizontal-stack-bar.component';

describe('HorizontalStackBarComponent', () => {
  let component: HorizontalStackBarComponent;
  let fixture: ComponentFixture<HorizontalStackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalStackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalStackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
