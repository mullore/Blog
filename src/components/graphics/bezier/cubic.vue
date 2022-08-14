<template>
  <canvas id="demo" width="512" height="512" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Vector2D } from '@/utils/graphics/common/vector2d';
function draw(
  points: Array<object>,
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

function parametric(xFunc: () => void, yFunc: () => void) {
  return function (start: number, end: number, seg = 100, ...args: Array<number>) {
    const points = [];
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = xFunc(t, ...args);
      const y = yFunc(t, ...args);
      points.push([x, y]);
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}

interface croodX {
  x: number;
}
interface croodY {
  y: number;
}

const cubicBezier = parametric(
  (t: number, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]: Array<croodX>) =>
    (1 - t) ** 3 * x0 + 3 * t * (1 - t) ** 2 * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3,
  (t: number, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]: Array<croodY>) =>
    (1 - t) ** 3 * y0 + 3 * t * (1 - t) ** 2 * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3,
);

onMounted(() => {
  const canvas = document.getElementById('demo') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);

  const p0 = new Vector2D(0, 0);
  const p1 = new Vector2D(100, 0);
  p1.rotate(0.75);
  const p2 = new Vector2D(150, 0);
  p2.rotate(0.75);
  const p3 = new Vector2D(200, 0);
  const count = 30;

  for (let i = 0; i < count; i++) {
    p1.rotate((Math.PI * 2) / count);
    p2.rotate((Math.PI * 2) / count);
    p3.rotate((Math.PI * 2) / count);
    cubicBezier(0, 1, 100, [p0, p1, p2, p3]).draw(ctx);
  }
});
</script>

<style>
</style>
