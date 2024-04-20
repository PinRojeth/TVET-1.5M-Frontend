/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  // barChartData: ChartData = {
  //   labels: [],
  //   datasets: [
  //     {
  //       data: []
  //     }
  //   ]
  // };
  // barChartOptions: any = {};

  // @Input() barChartLabel: string[] = [];
  // @Input() barChartDataset: number[][] = [];
  // @Input() backgroundColor: string[] = [];

  @Input() barChartDataset1: ChartData;
  @Input() barChartOptions1: ChartOptions;

  constructor() { }

  ngOnInit(): void {
    // this.setChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes?.barChartDataset?.currentValue) {
    //   this.setChart();
    // }
  }

  // setChart() {
  //   this.barChartData = {
  //     labels: this.barChartLabel,
  //     datasets: [
  //       {
  //         label: 'Pass',
  //         backgroundColor: this.backgroundColor[0],
  //         hoverBackgroundColor: this.backgroundColor[0],
  //         data: this.barChartDataset[0]
  //       },
  //       {
  //         label: 'Fail',
  //         backgroundColor: this.backgroundColor[1],
  //         hoverBackgroundColor: this.backgroundColor[1],
  //         data: this.barChartDataset[1]
  //       },
  //       {
  //         label: 'N/A',
  //         backgroundColor: this.backgroundColor[2],
  //         hoverBackgroundColor: this.backgroundColor[2],
  //         data: this.barChartDataset[2]
  //       }
  //     ]
  //   };

  //   const summaryList = this.sumArrays(this.barChartDataset);
  //   let maxTarget = 0;

  //   if (summaryList?.length > 0) {
  //     maxTarget = this.calcMaxTarget(summaryList);
  //   }

  //   this.barChartOptions = {
  //     responsive: true,
  //     aspectRatio: 920 / 420,
  //     categoryPercentage: 0.5,
  //     barPercentage: 0.5,
  //     borderRadius: 8,
  //     indexAxis: 'x',
  //     scales: {
  //       x: {
  //         stacked: true,
  //         grid: {
  //           borderDash: [5]
  //         },
  //         ticks: {
  //           stepSize: maxTarget / 5
  //         },
  //         min: 0,
  //         max: maxTarget
  //       },
  //       y: {
  //         stacked: true,
  //         grid: {
  //           display: false
  //         },
  //         ticks: {
  //           font: {
  //             family: "'Open Sans', Khmer, 'system ui'"
  //           }
  //         }
  //       }
  //     },
  //     plugins: {
  //       legend: {
  //         align: 'end',
  //         labels: {
  //           usePointStyle: true,
  //           padding: 30
  //         }
  //       }
  //     }
  //   };
  // }

  // sumArrays(list: any[]): number[] {
  //   const sums = list[0]?.map((x, index: number) => list.reduce((sum, curr) => sum + curr[index], 0));
  //   return sums;
  // }

  // calcMaxTarget(list: number[]): number {
  //   let maxTarget = 0;
  //   const maxNumber = Math.max(...list);
  //   if (maxNumber == 0) {
  //     return 12;
  //   }
  //   while (maxNumber > maxTarget) {
  //     if (maxTarget < 50) {
  //       maxTarget += 12;
  //     } else if (maxTarget < 500) {
  //       maxTarget += 50;
  //     } else if (maxTarget < 5000) {
  //       maxTarget += 500;
  //     } else {
  //       maxTarget += 1000;
  //     }
  //   }

  //   return maxTarget;
  // }
}
