import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DoughnutChartModel } from 'src/app/models/chart-constant-model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  type: ChartType = 'overlappedDoughnut';
  data: ChartData;
  options: any;

  @Input() chartData: DoughnutChartModel;
  @Input() sumLabel = '';

  constructor() {}

  ngOnInit(): void {}

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
      elements: {
        center: {
          text: this.sumData() + this.sumLabel,
          fontStyle: "'Open Sans', Khmer, 'system ui'",
          color: 'black'
        }
      }
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

  sumData() {
    let sum: number = 0;
    this.chartData.data.forEach(object => {
      sum += object;
    });
    return sum > 0 ? sum : '';
  }
}
