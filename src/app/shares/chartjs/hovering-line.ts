import { LineController } from 'chart.js';

export class HoveringLine extends LineController {
  draw() {
    super.draw();
    const tooltip = this.chart.tooltip;
    const activeEl = this.chart.getActiveElements();
    const ctx = this.chart.ctx;
    if (activeEl.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = 'hsla(258, 87%, 76%, 1)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(tooltip.caretX, tooltip.caretY + 3.5);
      ctx.lineTo(tooltip.caretX, this.chart.chartArea.bottom);
      ctx.stroke();
    }
    ctx.restore();
  }
}
HoveringLine.id = 'hoveringLine';
HoveringLine.defaults = LineController.defaults;

declare module 'chart.js' {
  interface ChartTypeRegistry {
    hoveringLine: ChartTypeRegistry['line'];
  }
}
