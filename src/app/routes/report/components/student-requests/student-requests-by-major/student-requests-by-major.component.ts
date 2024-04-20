import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackedBarChartModel } from 'src/app/models/chart-constant-model';
import { DateRange } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-student-requests-by-major',
  templateUrl: './student-requests-by-major.component.html',
  styleUrls: ['./student-requests-by-major.component.scss']
})
export class StudentRequestsByMajorComponent {

  color: string[] = ['#1AE5FF', '#FF96C7'];
  label: string[] = ['Male', 'Female'];
  stackedBarChartData: StackedBarChartModel;

  @Input()
  set dateRange(date: DateRange) {
    if (date?.start_date && date?.end_date) {
      this.getGraphDate(date);
    }
  }

  @Output() dataEmitted = new EventEmitter();

  constructor(
    private reportService: ReportService
  ) { }

  getGraphDate(date: DateRange) {

    const params = {
      start_date: date.start_date,
      end_date: date.end_date
    };
    this.reportService.getApprovedByMajor(params).subscribe({
      next: (res) => {
        let stackedBarChartDataArray: number[][] = [];
        let stackedBarChartLabels: string[] = [];
        let male: number[] = [];
        let female: number[] = [];

        for (const item of res.list) {
          stackedBarChartLabels.push(item.name);
          male.push(item.male);
          female.push(item.female);
        }

        stackedBarChartDataArray = [male, female];

        this.stackedBarChartData = {
          indexAxis: 'y',
          labels: stackedBarChartLabels,
          dataArray: stackedBarChartDataArray,
          legendLabels: this.label,
          colors: this.color
        };

        this.dataEmitted.emit(res.list);
      }
    });
  }
  
}
