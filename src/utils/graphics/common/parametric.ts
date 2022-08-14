function draw(
  points: Array<Object>,
  context: CanvasRenderingContext2D,
  { strokeStyle = 'black', fillStyle = null, close = false } = {},
) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...(points[0] as [number, number]));
  for (let i = 0; i < points.length; i++) {
    context.lineTo(...(points[i] as [number, number]));
  }
  if (close) context.closePath();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.stroke();
}

export function parametric(sFunc: () => void, tFunc: () => void, rFunc: () => void) {
  return function (start: number, end: number, seg = 100, ...args: Array<Object>) {
    const points = [];
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = sFunc(t, ...args);
      const y = tFunc(t, ...args);
      if (rFunc) {
        points.push(rFunc(x, y));
      } else {
        points.push([x, y]);
      }
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}
