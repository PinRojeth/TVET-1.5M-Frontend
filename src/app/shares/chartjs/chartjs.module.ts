import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartFileComponent } from './components/doughnut-chart-file/doughnut-chart-file.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { HorizontalStackBarComponent } from './components/horizontal-stack-bar/horizontal-stack-bar.component';
import { LineChartMultipleComponent } from './components/line-chart-multiple/line-chart-multiple.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { StackedBarChartFileComponent } from './components/stacked-bar-chart-file/stacked-bar-chart-file.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { HoveringLine } from './hovering-line';
import { OverlappedDoughnut } from './overlapped-doughnut';
import { OverlappedHalfDoughnut } from './overlapped-half-doughnut';

Chart.register(OverlappedDoughnut, HoveringLine);
Chart.register(OverlappedHalfDoughnut, HoveringLine);

@NgModule({
  declarations: [
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    StackedBarChartComponent,
    LineChartMultipleComponent,
    HorizontalStackBarComponent,
    StackedBarChartFileComponent,
    DoughnutChartFileComponent
  ],
  imports: [CommonModule, NgChartsModule, TranslateModule],
  exports: [
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    StackedBarChartComponent,
    LineChartMultipleComponent,
    HorizontalStackBarComponent,
    StackedBarChartFileComponent,
    DoughnutChartFileComponent
  ]
})
export class ChartjsModule {}
