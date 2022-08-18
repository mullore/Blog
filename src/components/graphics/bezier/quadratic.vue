<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";

import { Vector2D } from "@/utils/graphics/common/vector2d";

function draw(points: Array<object>, context: CanvasRenderingContext2D, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false,
} = {}) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0] as [number, number])
  for (let i = 0; i < points.length; i++) {
    context.lineTo(...points[i] as [number, number])
  }
  if (close) context.closePath()
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill()
  }
  context.stroke();
}

function parametric(xFunc: Function, yFunc: Function) {
  return function (start: number, end: number, seg = 100, ...args: Array<Number>) {
    const points: any[] = []
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p
      const x = xFunc(t, ...args)
      const y = yFunc(t, ...args)
      points.push([x, y])
    }
    return {
      // draw: draw.bind(null, points),
      draw: (contxt: CanvasRenderingContext2D) => draw(points, contxt),
      points
    }
  }
}

interface croodX {
  x: number,
}
interface croodY {
  y: number,
}
const quadricBezier = parametric(
  (t: number, [{ x: x0 }, { x: x1 }, { x: x2 }]: Array<croodX>) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
  (t: number, [{ y: y0 }, { y: y1 }, { y: y2 }]: Array<croodY>) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
);

onMounted(() => {
  const canvas = document.getElementById('demo') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(1, -1)

  const p0 = new Vector2D(0, 0)
  const p1 = new Vector2D(100, 0)
  p1.rotate(0.75)
  const p2 = new Vector2D(200, 0)
  const count = 30
  for (let i = 0; i < count; i++) {
    // 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线
    p1.rotate(2 * Math.PI / count)
    p2.rotate(2 * Math.PI / count)

    // @ts-ignore
    quadricBezier(0, 1, 100, [p0, p1, p2]).draw(ctx)

  }

})
</script>

<style>
</style>