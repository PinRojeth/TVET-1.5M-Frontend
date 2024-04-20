import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DoughnutChartModel } from 'src/app/models/chart-constant-model';

@Component({
  selector: 'app-doughnut-chart-file',
  templateUrl: './doughnut-chart-file.component.html',
  styleUrls: ['./doughnut-chart-file.component.scss']
})
export class DoughnutChartFileComponent implements OnChanges {
  type: ChartType = 'overlappedDoughnut';
  data: ChartData;
  options: any;

  @Input() chartData: DoughnutChartModel;
  @Input() middleText: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      this.setCart();
    }
  }

  setCart() {
    this.type = this.chartData.type ?? this.type;
    const datasets: ChartDataset[] = [
      {
        label: '',
        data: this.chartData.data,
        backgroundColor: this.chartData.colors,
        hoverBackgroundColor: this.chartData.colors,
        borderWidth: 0
      }
    ];
    const data: ChartData = {
      labels: this.chartData.labels,
      datasets: datasets
    };

    let doughnutConfig: any = {
      responsive: true,
      cutout: '70%',
      elements: {}
    };
    if (this.chartData.type === 'overlappedHalfDoughnut') {
      doughnutConfig.circumference = 180;
      doughnutConfig.rotation = -90;
    }

    const doughnutOptions: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
          backgroundColor: '#fff',
          borderColor: 'rgba(0,0,0,0.05)',
          borderWidth: 3,
          titleColor: '#000',
          titleFont: {
            weight: ''
          },
          bodyColor: '#000',
          bodyFont: {
            family: 'Khmer'
          },
          padding: 10,
          cornerRadius: 10,

          callbacks: {
            label: context => {
              let label: string;
              if (context.label !== null) {
                label = context.label;
              }
              return label;
            }
          }
        }
      }
    };

    const doughnutConfigOptions = {
      ...doughnutConfig,
      ...doughnutOptions
    };

    this.data = data;
    this.options = doughnutConfigOptions;
  }
}
