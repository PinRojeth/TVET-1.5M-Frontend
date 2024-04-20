import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart-multiple',
  templateUrl: './line-chart-multiple.component.html',
  styleUrls: ['./line-chart-multiple.component.scss']
})
export class LineChartMultipleComponent implements OnChanges {
  stepSize: number = 1;

  chartLineType: ChartType = 'hoveringLine';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [{ data: [] }],
    labels: []
  };
  lineChartOptions: ChartConfiguration['options'] = {};

  width = 0;
  height = 0;
  gradient: undefined | any;
  customLineChartLabel: string[] = [];

  @Input() multiDataSet: any;
  @Input() lineChartLabel: string[] = [];
  @Input() colors: string[] = ['#07DF0F', '#F8C002'];

  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;
  @ViewChild('myCanvas') canvas: ElementRef | any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.multiDataSet?.currentValue) {
      this.setChart();
    }
  }

  setChart(): void {
    const maxReq = Math.max(...this.multiDataSet.req);
    const maxRes = Math.max(...this.multiDataSet.res);
    const max = maxReq > maxRes ? maxReq : maxRes;

    if (max <= 5) {
      this.stepSize = 1;
    } else if (max <= 10) {
      this.stepSize = 2;
    } else {
      this.stepSize = 5;
    }

    let customDate: string[] = [];

    this.lineChartLabel.forEach((element, index) => {
      if (index % 5 === 0) {
        customDate.push(moment(element).format('DD MMM'));
      } else {
        customDate.push('');
      }
    });

    this.customLineChartLabel = customDate;

    this.lineChartData = {
      datasets: [
        {
          label: 'Request',
          data: this.multiDataSet.req,
          backgroundColor: this.colors[0],
          borderColor: this.colors[0],
          borderWidth: 2,
          pointRadius: 0,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          tension: 0.4,
          segment: {
            backgroundColor: ctx => 'transparent'
          }
        },
        {
          label: 'Response',
          data: this.multiDataSet.res,
          backgroundColor: this.colors[1],
          borderColor: this.colors[1],
          borderWidth: 2,
          pointRadius: 0,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          tension: 0.4,
          segment: {
            backgroundColor: ctx => 'transparent'
          }
        }
      ],
      labels: this.customLineChartLabel
    };

    this.lineChartOptions = {
      aspectRatio: 920 / 350,
      interaction: {
        intersect: false,
        mode: 'x'
      },
      responsive: true,
      hover: {
        mode: 'nearest'
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false
          },
          ticks: {
            padding: 20
          }
        },
        y: {
          beginAtZero: true,
          suggestedMin: 2,
          suggestedMax: 5,
          grid: {
            borderColor: '#FAFAF5'
          },
          ticks: {
            stepSize: this.stepSize,
            padding: 20
          }
        }
      },
      plugins: {
        legend: {
          align: 'end',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          padding: 10,
          xAlign: 'center',
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFont: {
            size: 14,
            weight: 'bold',
            family: "'Inter var', Battambang, 'system ui'"
          },
          titleColor: '#000',
          bodyFont: {
            size: 12,
            family: "'Inter var', Battambang, 'system ui'"
          },
          bodyColor: '#000',
          displayColors: false,
          backgroundColor: '#fff',
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 3,
          callbacks: {
            title: context => {
              let customDate = [];
              for (let val of this.lineChartLabel) {
                customDate.push(moment(val).format('DD MMMM'));
              }
              return customDate[context[0].dataIndex];
            },
            label: context => {
              return 'Document ' + context.dataset.label.toLowerCase() + 's: ' + context.parsed.y;
            }
          }
        }
      }
    };
  }
}
