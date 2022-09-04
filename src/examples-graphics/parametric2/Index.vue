<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";

// 尚未学会参数方程,后续再添加注释

//绘制顶点
function draw(points: Array<Object>, context: CanvasRenderingContext2D, {
  //轮廓色
  strokeStyle = 'black',
  //填充色
  fillStyle = null,
  //是否闭合路径
  close = false
} = {}) {
  //设置轮廓色
  context.strokeStyle = strokeStyle;
  //开始新的路径
  context.beginPath();
  //遍历顶点,绘制直线
  for (let i = 0; i < points.length; i++) {
    context.lineTo(...points[i] as [number, number])
  }
  //是否闭合路径
  if (close) context.closePath();
  //如果有填充色
  if (fillStyle) {
    //设置填充颜色
    context.fillStyle = fillStyle;
    //执行填充
    context.fill();
  }
  //绘制路径
  context.stroke();
}

function parametric(xFunc: Function, yFunc: Function) {
  //start,end 表示参数方程中关键参数范围的参数，
  //seg 表示采样点个数的参数
  //start 和 end 可以是圆或椭圆的弧度范围，也可以是一段类似于坐标的范围，最终 t 是这个范围内的线性插值。
  //之后各个曲线的坐标再基于这个线性变化的 t 计算各自的变化结果；
  return function (start: number, end: number, seg = 100, ...args: Array<Number>) {
    const points = []
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      //线性插值，t是当前时间的值
      const t = start * (1 - p) + end * p;
      const x = xFunc(t, ...args)
      const y = yFunc(t, ...args)
      points.push([x, y])
    }
    //返回技巧
    return {
      draw: draw.bind(null, points),
      // points
    }
  }
}
//抛物线
const parse = parametric(
  (t: number) => 25 * t,
  (t: number) => 25 * t ** 2
)
//阿基米德螺旋线
const helical = parametric(
  (t: number, l: number) => l * t * Math.cos(t),
  (t: number, l: number) => l * t * Math.sin(t)
)
//星形线
const star = parametric(
  (t: number, l: number) => l * Math.cos(t) ** 3,
  (t: number, l: number) => l * Math.sin(t) ** 3
)
onMounted(() => {
  //获取画布
  const canvas = document.getElementById('demo') as HTMLCanvasElement
  //设置画布绘制环境
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  //设置坐标系原点坐标
  ctx.translate(canvas.width / 2, canvas.height / 2)
  //Y轴翻转
  ctx.scale(1, -1)

  //绘制抛物线
  parse(-5.5, 5.5).draw(ctx)
  //绘制阿基米德螺旋线
  helical(0, 50, 500, 5).draw(ctx, { strokeStyle: 'blue' })
  //绘制星形线
  star(0, Math.PI * 2, 50, 150).draw(ctx, { strokeStyle: 'red' })

})
</script>

<style>
</style>