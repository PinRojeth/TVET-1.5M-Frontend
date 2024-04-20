import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { StackedBarChartModel } from 'src/app/models/chart-constant-model';
import { SizePipe } from 'src/app/shares/file/size.pipe';

@Component({
  selector: 'app-stacked-bar-chart-file',
  templateUrl: './stacked-bar-chart-file.component.html',
  styleUrls: ['./stacked-bar-chart-file.component.scss'],
  providers: [SizePipe]
})
export class StackedBarChartFileComponent implements OnChanges {
  data: ChartData;
  options: ChartOptions;

  @Input() chartData: StackedBarChartModel;
  @Input() height: number = null;

  sizePipe: SizePipe = inject(SizePipe);
  translate: TranslateService = inject(TranslateService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData.currentValue) {
      this.setChart();
    }
  }

  setChart() {
    /**
     * check max target number in the list
     */
    const summaryList: number[] = this.sumArrays(this.chartData.dataArray);
    let maxTarget: number = 0;
    const sizePipe: SizePipe = this.sizePipe;

    if (summaryList?.length > 0) {
      maxTarget = this.calcMaxTarget(summaryList);
    }

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
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Inter, Khmer, system ui'
            }
          }
        },
        y: {
          stacked: true,
          ticks: {
            callback: function (value, index, values) {
              return sizePipe.transform(maxTarget > 0 ? +value : 0, 0);
            },
            // stepSize: maxTarget / 5,
            font: {
              family: 'Inter, Khmer, system ui'
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
              label = 'File size: ' + sizePipe.transform(context.parsed.y);
              return label;
            },
            beforeBody: context => {
              return 'Name: ' + context[0]?.label;
            }
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
    const maxNumber = Math.max(...list);
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
