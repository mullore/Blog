<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";

// 尚未学会参数方程,后续再添加注释

function draw(context: CanvasRenderingContext2D, points: Array<Object>, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false
} = {}) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0] as [number, number])
  for (let i = 0; i < points.length; i++) {
    context.lineTo(...points[i] as [number, number])
  }
  if (close) context.closePath();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill()
  }
  context.stroke();
}

const LINE_SEGMENTS = 60;
function parabola(x0: number, y0: number, p: number, min: number, max: number) {
  const ret = []
  //抛物线(二次曲线)参数方程：x=x0 +2pt^2,y=y0+2pt
  for (let i = 0; i < LINE_SEGMENTS; i++) {
    const s = i / 60
    const t = min * (1 - s) + max * s
    const x = x0 + 2 * p * t ** 2;
    const y = y0 + 2 * p * t
    ret.push([x, y])
  }
  return ret
}

onMounted(() => {
  const canvas = <HTMLCanvasElement>document.getElementById('demo');
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  draw(ctx, parabola(0, 0, 5.5, -10, 10))

})
</script>

<style>
</style>