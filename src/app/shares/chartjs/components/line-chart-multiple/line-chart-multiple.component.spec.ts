import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartMultipleComponent } from './line-chart-multiple.component';

describe('LineChartMultipleComponent', () => {
  let component: LineChartMultipleComponent;
  let fixture: ComponentFixture<LineChartMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
