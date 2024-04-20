import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-horizontal-stack-bar',
  templateUrl: './horizontal-stack-bar.component.html',
  styleUrls: ['./horizontal-stack-bar.component.scss']
})
export class HorizontalStackBarComponent implements OnChanges {
  @Input() totalFiles: number = 0;

  @Input() barChartData: ChartDataset[] = [{ data: [1] }, { data: [1] }, { data: [1] }];
  barChartLabels: string[] = [''];

  barChartOptions: ChartOptions = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false
      },
      y: {
        stacked: true,
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.totalFiles?.currentValue) {
      this.barChartOptions = {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            stacked: true,
            display: false,
            ticks: {
              stepSize: this.totalFiles
            }
          },
          y: {
            stacked: true,
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      };
    }
  }
}
