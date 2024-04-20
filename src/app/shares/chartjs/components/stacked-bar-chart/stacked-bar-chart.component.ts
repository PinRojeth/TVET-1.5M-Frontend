import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { StackedBarChartModel } from 'src/app/models/chart-constant-model';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {
  data: ChartData;
  options: ChartOptions;

  @Input() chartData: StackedBarChartModel;
  @Input() height: number = null;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData.currentValue) {
      this.setChart();
    }
  }

  setChart() {
    /**
     * check max target number in the list
     */
    const summaryList = this.sumArrays(this.chartData.dataArray);
    let maxTarget = 0;
    maxTarget = this.calcMaxTarget(summaryList);
    
    /**
     * chart dataset
     */
    const datasets: ChartDataset[] = [];
    this.chartData.dataArray.map((data, index) => {
      datasets.push({
        label: this.chartData.legendLabels[index],
        data: data,
        backgroundColor: this.chartData.colors ? this.chartData.colors[index] : null,
        borderColor: this.chartData.colors ? this.chartData.colors[index] : null,
        hoverBackgroundColor: this.chartData.colors ? this.chartData.colors[index] : null,
        maxBarThickness: 16,
        borderRadius: 8
      });
    });

    /**
     * chart config
     */
    const data: ChartData = {
      labels: this.chartData.labels,
      datasets: datasets
    };

    const options: ChartOptions = {
      indexAxis: this.chartData.indexAxis ?? 'x',
      responsive: true,
      aspectRatio: 920 / 420,
      scales: {
        // configured into stacked bar charts by changing the settings on the X and Y axes to enable stacking
        x: {
          stacked: true,
          grid: {
            borderDash: [12]
          },
          ticks: {
            stepSize: maxTarget / 5
          },
          min: 0,
          max: maxTarget
        },
        y: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Khmer'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          displayColors: false,
          backgroundColor: '#fff',
          borderColor: 'rgba(0,0,0,0.05)',
          borderWidth: 3,
          bodyColor: '#000',
          bodySpacing: 8,
          bodyFont: {
            family: 'Khmer'
          },
          padding: 10,
          caretPadding: 10,
          caretSize: 10,
          cornerRadius: 10,

          callbacks: {
            title: () => {
              return '';
            },
            label: context => {
              let label: string;
              label = context.dataset.label + ': ' + context.parsed.x.toString();
              return label;
            }
            // beforeBody: context => {
            //   let total: string;
            //   let sum: number = 0;
            //   context.forEach(object => {
            //     const parsed = object.parsed;
            //     Object.keys(object).find(() => (sum += parsed['x']));
            //   });

            //   total = 'Total: ' + sum;
            //   return total;
            // }
          }
        }
      }
    };

    this.data = data;
    this.options = options;
  }

  sumArrays(list: any[]): number[] {
    if (list?.length <= 0) return;
    const sums = list[0].map((x: any, index: number) => list.reduce((sum, curr) => sum + curr[index], 0));
    return sums;
  }

  calcMaxTarget(list: number[]): number {
    let maxTarget = 0;
    const maxNumber = list?.length > 0 ? Math.max(...list) : 0;
    if (maxNumber == 0) {
      return 10;
    }
    while (maxNumber > maxTarget) {
      if (maxTarget < 50) {
        maxTarget += 10;
      } else if (maxTarget < 500) {
        maxTarget += 50;
      } else if (maxTarget < 5000) {
        maxTarget += 500;
      } else {
        maxTarget += 1000;
      }
    }
    return maxTarget;
  }
}
