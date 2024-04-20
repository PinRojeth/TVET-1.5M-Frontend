import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartFileComponent } from './doughnut-chart-file.component';

describe('DoughnutChartFileComponent', () => {
  let component: DoughnutChartFileComponent;
  let fixture: ComponentFixture<DoughnutChartFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChartFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughnutChartFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
