import { DoughnutController } from 'chart.js';

export class OverlappedDoughnut extends DoughnutController {
  override draw() {
    super.draw();
    const ctx = this.chart.ctx;
    const arcs: any = this.getMeta().data;
    for (const [i, arc] of arcs.entries()) {
      const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
      const nextColor = pArc.getProps(['backgroundColor'])['options']['backgroundColor'];
      const vm = arc.getProps(['x', 'y', 'outerRadius', 'innerRadius', 'startAngle', 'endAngle', 'backgroundColor']);
      const radius = (+vm['outerRadius'] + +vm['innerRadius']) / 2;
      const thickness = (+vm['outerRadius'] - +vm['innerRadius']) / 2;
      const startAngle = Math.PI - +vm['startAngle'] - Math.PI / 2;
      const angle = Math.PI - +vm['endAngle'] - Math.PI / 2;

      ctx.save();
      ctx.translate(+vm['x'], +vm['y']);
      ctx.fillStyle = (i === 0 ? vm['options']['backgroundColor'] : nextColor) as string;

      ctx.beginPath();
      // ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = vm['options']['backgroundColor'] as string;
      ctx.beginPath();
      // ctx.arc(radius * Math.sin(angle + 0.05), radius * Math.cos(angle + 0.05), thickness, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    }

    if ((this.chart as any).config.options.elements.center) {
      // Get ctx from string
      // Get options from the center object in options
      const centerConfig = (this.chart as any).config.options.elements.center;
      const fontStyle = centerConfig.fontStyle || 'Arial';
      const txt = centerConfig.text;
      const color = centerConfig.color || '#000';
      const maxFontSize = centerConfig.maxFontSize || 70;
      const sidePadding = centerConfig.sidePadding || 20;
      if (arcs?.length <= 0) return;
      const sidePaddingCalculated = (sidePadding / 100) * (arcs[0].getProps(['innerRadius']) * 2);
      // Start with a base font of 30px
      ctx.font = '16px ' + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = arcs[0].getProps(['innerRadius']) * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = arcs[0].getProps(['innerRadius']) * 2;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let minFontSize = centerConfig.minFontSize;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 16;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let centerX = (this.chart.chartArea.left + this.chart.chartArea.right) / 2;
      let centerY = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + 'px ' + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(' ');
      let line = '';
      const lines = [];

      // Break words up into multiple lines if necessary
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (let n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      //Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  }
}
OverlappedDoughnut.id = 'overlappedDoughnut';
OverlappedDoughnut.defaults = DoughnutController.defaults;
