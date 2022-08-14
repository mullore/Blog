<template>
  <canvas width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { Vector2D } from "@/utils/graphics/common/vector2d";
import { onMounted } from "vue";

// context 是我们的 Canvas2D 上下文
// v0是起始向量
// length 是当前树枝的长度
// thickness 是当前树枝的粗细
// dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
// bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
function drawBranch(context: CanvasRenderingContext2D, v0: any, length: any, thickness: any, dir: any, bias: any) {

  // 因为 v0是树枝的起点坐标，那根据前面向量计算的原理，我们创建一个单位向量 (1, 0)，
  // 它是一个朝向 x 轴，长度为 1 的向量。然后我们旋转 dir 弧度，再乘以树枝长度 length。
  // 这样，我们就能计算出树枝的终点坐标了
  const v = new Vector2D(1, 0).rotate(dir).scale(length);
  const v1 = v0.copy().add(v);

  //设置线段厚度
  context.lineWidth = thickness;
  //开始一个新路径
  context.beginPath();
  //定义起始点坐标
  context.moveTo(...v0);
  //使用直线连接的终点(并不会真正地绘制)
  context.lineTo(...v1);
  //strok()：根据当前的画线样式,绘制当前或已经存在的路径的方法
  //真正画线
  context.stroke();

  if (thickness > 2) {
    
    // context 是我们的 Canvas2D 上下文
    // v0是起始向量
    // length 是当前树枝的长度 
    // thickness 是当前树枝的粗细
    // dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
    // bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性

    const left = dir + 0.2;
    // const left = Math.PI/4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5 )//增加随机
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9)
    const right = dir - 0.2;
    // const right = Math.PI/4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5 ) //增加随机
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9)

  }

  // 随机绘制一些花瓣
  if (thickness < 5 && Math.random() < 0.3) {
    //保存默认的状态
    //将当前状态放入栈中,保存canvas 全部状态的方法
    context.save()
    //设置轮廓线颜色
    context.strokeStyle = '#c72c35'
    const th = Math.random() * 6 + 3
    //定义线段厚度
    context.lineWidth = th;
    //创建新路径
    context.beginPath();
    //定义起始点
    context.moveTo(...v1);
    //定义线段终点
    context.lineTo(v1.x, v1.y - 2);
    //绘制路径
    context.stroke();
    //恢复保存的状态
    context.restore();
  }


}

onMounted(() => {
  //获取画布
  const canvas = <HTMLCanvasElement>document.querySelector('canvas');
  //定义绘画环境
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  //坐标变换将坐标原点从左上角移动到左下角，并且让 y 轴翻转为向上
  ctx.translate(0, canvas.height)
  ctx.scale(1, -1);
  //lineCap 属性设置或返回线条末端线帽的样式。
  ctx.lineCap = 'round'

  const v0 = new Vector2D(256, 0);
  // context 是我们的 Canvas2D 上下文
  // v0是起始向量
  // length 是当前树枝的长度 
  // thickness 是当前树枝的粗细
  // dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
  // bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
  drawBranch(ctx, v0, 50, 10, 1.5, 3);

})
</script>

<style scoped>
</style>