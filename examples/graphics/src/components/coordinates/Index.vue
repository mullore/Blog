<template>
  <canvas id="demo" width="512" height="256" />
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
// import rough from 'roughjs'
onMounted(() => {
  const rough = require('roughjs/bundled/rough.cjs')
  const rc = rough.canvas(document.getElementById('demo') as any);
  const ctx = rc.ctx;
  // 等于
  // const rc2 = document.getElementById('demo') as any
  // console.log(rc2.getContext("2d"));

  const hillOpts = {
    // 绘画粗糙程度
    roughness: 2.8,
    // 边框粗细
    strokeWidth: 2,
    // 填充颜色
    fill: 'blue',
  };

  // 坐标系变换

  // translate(x,y)方法重新映射画布上的 (0,0) 位置。也就是画布的平移
  ctx.translate(256, 256);
  // 垂直翻转上下文
  // canvas的坐标系是向右为x正方向，向下为y正方向,所以改成y向上为正
  ctx.scale(1, -1);

  // M x,y（移动）定义第一个点得坐标
  // L x,y(直线)`Lineto`指令将绘制一条直线段。这个直线段从当前位置移到指定位置
  rc.path('M-180 0L-80 100L20 0', hillOpts);
  // 等于 rc.path('M-180,0L-80,100L20,0', hillOpts);
  rc.path('M-20 0L80 100L180 0', hillOpts);

  // circle(x,y,半径,{})
  rc.circle(0, 150, 105, {
    // 边框色
    stroke: 'red',
    // 边框粗细程度
    strokeWidth: 4,
    // 填充颜色
    fill: 'rgba(255,255,0,0.4)',
    // 填充类型
    fillStyle: 'solid',
  });

  // 坐标换算(注意,canvas坐标原点是在左上角)

  // 假设，我们要在宽 512 * 高 256 的一个 Canvas 画布上实现如下的视觉效果。其中，
  // 山的高度是 100，底边 200，两座山的中心位置到中线的距离都是 80，太阳的圆心高度是 150。

  // 首先，因为 Canvas 坐标系默认的原点是左上角，底边的 y 坐标是 256，
  // 而山的高度是 100，所以山顶点的 y 坐标是 256 - 100 = 156。
  // 而因为太阳的高度是 150，所以太阳圆心的 y 坐标是 256 - 150 = 106。
  // 然后，因为 x 轴中点的坐标是 512 / 2 = 256，所以两座山顶点的 x 坐标分别是 256 - 80 和 256 + 80，
  // 也就是 176 和 336。又因为山是等腰三角形，它的底边是 200，所以两座山底边的 x 坐标计算出来，
  // 分别是 76、276、236、436（176 - 100 =76、176 + 100=276、336 - 100=236、 336 + 100=436）。

  // rc.path('M76,256L176,156L276,256',hillOpts)

  // rc.path('M236,256L336,156L436,256',hillOpts)

  // rc.circle(256,106,105,{
  //   stroke:'red',
  //   strokeWidth:4,
  //   fill: "rgba(255,255,0,0.4)",
  //   fillStyle:'solid'
  // })
});
</script>

<style>
</style>
