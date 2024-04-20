import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  stepSize: number = 1;
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };
  lineChartOptions: ChartConfiguration['options'] = {};

  @Input() datasetLabel: string;
  @Input() lineChartDataset: number[] = [];
  @Input() lineChartLabel: string[] = [];

  /////
  @Input() lineChartDataset1: ChartData;
  @Input() lineChartOptions1: ChartOptions;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.lineChartDataset.currentValue) {
    //   this.setChart();
    // }
  }

  setChart() {
    if (this.lineChartDataset?.length > 0) {
      const max = Math.max(...this.lineChartDataset);
      if (max <= 5) {
        this.stepSize = 1;
      } else if (max <= 10) {
        this.stepSize = 2;
      } else {
        this.stepSize = 10;
      }
    }

    this.lineChartData = {
      labels: this.lineChartLabel,
      datasets: [
        {
          label: this.datasetLabel,
          data: this.lineChartDataset,
          borderColor: '#3f88f5',
          pointRadius: 6,
          pointHoverRadius: 7,
          pointBackgroundColor: '#3f88f5',
          pointHoverBackgroundColor: '#3f88f5',
          pointHoverBorderColor: '#ffffff',
          tension: 0.3
        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      aspectRatio: 920 / 380,
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
            drawBorder: false
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
            drawBorder: false
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
            padding: 30
          }
        }
        // tooltip: {
        //   yAlign: 'bottom',
        //   titleFont: {
        //     weight: 'normal',
        //     family: "'Open Sans', Khmer, 'system ui'"
        //   },
        //   titleColor: '#000000',
        //   bodyFont: {
        //     family: "'Open Sans', Khmer, 'system ui'"
        //   },
        //   bodyColor: '#000000',
        //   displayColors: false,
        //   backgroundColor: '#ffffff',
        //   padding: 10,
        // }
      }
    };
  }
}
