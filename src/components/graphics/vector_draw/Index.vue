<template>
  <canvas id="demo" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { Vector2D } from "@/utils/graphics/common/vector2d";

//形状
//边数 edges
//起点 x, y
//一条边的长度 step
function regularShape(edges = 3, x: number, y: number, step: number) {
  const ret = [];
  //多边内角和得计算公式为 (n-2)*180
  //n边形外角和等于 n * 180 -（n-2) * 180 = 360
  //弧度数公式就是角度数×﹙π／180°﹚，因为一个π＝180°，比如一个角的度数是540°，那么它的弧度数＝540°×﹙π／180°﹚＝3π。
  //1弧度= 180/Math.PI
  //1角度= Math.PI/180

  //回顾了下三角形内角和以及多边形内角和公式后明白了：
  // !!!三角形内角和=180，多边形内角和= (n-2)*180 度；
  // 如果是正多边形，则每个角的角度= (n-2)*180/n 度; (每个角的角度=内角和/角数)
  // 那么每条边需要转动的角度则为每个角的补角=180-(n-2)*180/n 度; (补角=180-内角）
  // 转换成弧度=(Math.PI/180) * (180-(n-2)*180/n) rad; （弧度数公式=﹙π／180°﹚x 角度数 ）
  // !!!化简后，每条边需要转动的弧度差 = Math.PI/180 * 180*(1-(n-2)/n) = Math.PI*(1-(n-2)/n) rad
  const delta = Math.PI * (1 - (edges - 2) / edges);
  //定义初始点
  let p = new Vector2D(x, y)
  //定义初始方向为 x 轴方向
  const dir = new Vector2D(step, 0)
  //将初始点添加的数组
  ret.push(p)
  //循环计算正多边形的顶点位置，也就是从初始点开始，每次将方向向量旋转 delta 角度，
  //delta 角度是根据正多边形内角公式计算出来的
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta))
    ret.push(p)
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
  //获取画布元素
  const canvas = <HTMLCanvasElement>document.getElementById('demo');
  //定义画布绘制环境
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  //定义坐标系原点坐标
  ctx.translate(canvas.width / 2, canvas.height / 2)
  //y轴翻转
  ctx.scale(1, -1)

  //三角形
  draw(ctx, regularShape(3, 128, 128, 100))
  //六边形
  draw(ctx, regularShape(6, -64, 128, 50))
  //十一边形
  draw(ctx, regularShape(11, -64, -64, 30))
  //六十边形
  draw(ctx, regularShape(60, 128, -64, 6))

})
</script>

<style>
</style>