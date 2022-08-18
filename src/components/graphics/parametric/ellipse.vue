<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
//绘画
//context 画布环境
//points 顶点
//{} 配置参数
function draw(context: CanvasRenderingContext2D, points: Array<Object>, {
  //轮廓线颜色
  strokeStyle = 'black',
  //填充颜色
  fillStyle = null,
  //是否闭合路径
  close = false
} = {}) {
  //设置轮廓线
  context.strokeStyle = strokeStyle;
  //开始新的路径
  context.beginPath()
  //定义起始点
  context.moveTo(...points[0] as [number, number])
  //遍历顶点绘制直线
  for (let i = 1; i < points.length; i++) {
    //
    context.lineTo(...points[i] as [number, number])
  }
  //是否路径闭合
  if (close) context.closePath();
  //如果有设置填充色执行
  if (fillStyle) {
    //设置填充颜色
    context.fillStyle = fillStyle;
    //执行填充
    context.fill()
  }
  //绘制路径
  context.stroke()
}

//整圆的边数
const TAU_SEGMENTS = 60;
//一个完整的圆的弧度是2π
const TAU = Math.PI * 2;
//椭圆的参数方程。它其实和圆的参数方程很接近。
//其中，a、b 分别是椭圆的长轴和短轴，当 a = b = r 时，这个方程是就圆的方程式。所以，圆实际上就是椭圆的特例
function ellipse(x0: number, y0: number, radiusX: number, radiusY: number, startAng = 0, endAng = Math.PI * 2) {
  //弧度
  const ang = Math.min(TAU, endAng - startAng)
  //如果弧度小于 2π 则不是一个完整圆,定义原点圆点为起始坐标,以示缺角圆
  const ret = ang === TAU ? [] : [[x0, y0]]
  //圆弧的线段数 = 整圆的线段数乘以弧度与2pi的比值
  const segments = Math.round(TAU_SEGMENTS * ang / TAU)

  for (let i = 0; i <= segments; i++) {
    //椭圆的参数方程 x = x0+ a*cos(θ),y = y0+ b*sin(θ)
    const x = x0 + radiusX * Math.cos(startAng + ang * i / segments)
    const y = y0 + radiusY * Math.sin(startAng + ang * i / segments)
    ret.push([x, y])
  }
  return ret

}

onMounted(() => {
  //定义画布
  const canvas = document.getElementById('demo') as HTMLCanvasElement;
  //设置画布绘制环境
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  //设置坐标系原点坐标
  ctx.translate(canvas.width / 2, canvas.height / 2)
  //Y轴翻转
  ctx.scale(1, -1)

  draw(ctx, ellipse(0, 0, 100, 50), { strokeStyle: 'red' })


})
</script>

<style>
</style>