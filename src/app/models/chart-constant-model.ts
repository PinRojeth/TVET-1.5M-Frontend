import { ChartType } from "chart.js";

export interface ChartConstantModel {
  labels: string[];
  colors?: string[];
}

export interface StackedBarChartModel extends ChartConstantModel {
  indexAxis?: "x" | "y";
  legendLabels?: string[];
  dataArray: number[][];
}

export interface DoughnutChartModel extends ChartConstantModel {
  type?: ChartType; // like: 'overlappedHalfDoughnut' | 'overlappedDoughnut', ..
  data: number[];
}
