<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";


// 在Canvas中绘制圆或圆弧时用到的是弧度(rad)。
// 一个完整的圆的弧度是2π,所以
// 2π rad = 360°,1π rad = 180°,
// 1°=π/180 rad,1 rad = 180°/π。
// 以度数表示的角度:deg = (rad * 180) / π
// 以弧度表示的角度:rad = (π / 180) * deg


//整圆的线段数
const TAU_SEGMENTS = 60;
//2π
const TAU = Math.PI * 2;

// 圆心为 x0、y0,
// 半径为 radius,
// 起始角度为 startAng，
// 结束角度是 endAng
function arc(x0: number, y0: number, radius: number, startAng = 0, endAng = Math.PI * 2) {
  //弧度
  const ang = Math.min(TAU, endAng - startAng);
  //如果不是一个圆(小于2π),则设置起始坐标为原点
  const ret = ang === TAU ? [] : [[x0, y0]];
  //圆弧的线段数 = 整圆的线段数乘以弧度与2pi的比值
  const segments = Math.round(TAU_SEGMENTS * ang / TAU);//60
  //
  for (let i = 0; i <= segments; i++) {
    // 一个完整的圆的弧度是2π
    //圆的参数方程 x=x+rcos(θ),y=y+rsin(θ)
    const x = x0 + radius * Math.cos(startAng + ang * i / segments);
    const y = y0 + radius * Math.sin(startAng + ang * i / segments);
    ret.push([x, y]);
  }
  return ret;
}


//绘画
//context 画布环境
//points 顶点
//strokeStyle 轮廓线颜色
//fillStyle 填充颜色
function draw(context: CanvasRenderingContext2D, points: Array<Object>, strokeStyle = 'black', fillStyle = null) {

  //设置轮廓线颜色
  context.strokeStyle = strokeStyle;
  //开始新的路径
  context.beginPath()
  //定义起始点
  context.moveTo(...points[0] as [number, number]);
  for (let i = 1; i < points.length; i++) {
    //添加一个新点
    context.lineTo(...points[i] as [number, number])
  }
  //路径闭合
  context.closePath();
  //如果定义了填充颜色 ，则执行
  if (fillStyle) {
    // 设置填充颜色
    context.fillStyle = fillStyle;
    //执行填充
    context.fill()
  }
  //绘制路径
  context.stroke();
}
onMounted(() => {
  //获取画布
  const canvas = document.getElementById('demo') as HTMLCanvasElement;
  //设置画布绘制环境
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  //设置坐标系原点坐标
  ctx.translate(canvas.width / 2, canvas.height / 2)
  //Y轴翻转
  ctx.scale(1, -1);
  //绘制圆
  draw(ctx, arc(0, 0, 100, 0))

})
</script>

<style>
</style>