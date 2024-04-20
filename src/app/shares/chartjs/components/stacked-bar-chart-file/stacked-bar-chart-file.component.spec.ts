import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarChartFileComponent } from './stacked-bar-chart-file.component';

describe('StackedBarChartFileComponent', () => {
  let component: StackedBarChartFileComponent;
  let fixture: ComponentFixture<StackedBarChartFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedBarChartFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedBarChartFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
