import { ChartTypeRegistry } from 'chart.js';
declare module 'chart.js' {
  interface ChartTypeRegistry {
    overlappedDoughnut: ChartTypeRegistry['doughnut'];
    overlappedHalfDoughnut: ChartTypeRegistry['doughnut'];
  }
}
