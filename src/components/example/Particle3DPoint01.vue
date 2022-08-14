<template>
  <div id="demo" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as three from 'three';
import tween from '@tweenjs/tween.js';
// import { FBXLoader } from "other/examples/jsm/loaders/FBXLoader";

let scene: any;
export default defineComponent({
  data() {
    return {
      camera: null as any,
      renderer: null as any,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      scene = new three.Scene();
      this.createGeometry();
      this.createCamera();
      this.createLight();
      this.createRender();
      this.render();
    },
    // 创建模型
    createGeometry() {
      // SphereGeometry 几何体类模型
      // PointsMaterial 点材质
      // Points
      const particle = new three.Points(
        new three.SphereGeometry(40, 30, 30),
        new three.PointsMaterial({
          // 设置点的大小。默认值为1.0。
          size: 1.5,
          // 前面FrontSide  背面：BackSide 双面：DoubleSide
          side: three.DoubleSide,
          // 指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。
          sizeAttenuation: true,
          // 材质的颜色(Color)，默认值为白色 (0xffffff)。
          color: 0xdd00ff,
          // transparent设置为true，开启透明，否则opacity不起作用
          transparent: true,
          // 设置材质透明度
          opacity: 0.4,
          // 贴图
          map: new three.TextureLoader().load(`gradient.png`),
        }),
      );
      scene.add(particle);
    },
    // 创建相机
    createCamera() {
      this.camera = new three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      this.camera.position.set(0, 0, 150);
    },
    // 创建灯光
    createLight() {
      // 户外光
      const hemiSphereLight = new three.HemisphereLight(0xaaaaaa, 0xffffff, 0.3);
      scene.add(hemiSphereLight);
      // 环境光
      const ambientLight = new three.AmbientLight(0xdc8874, 0.2);
      scene.add(ambientLight);
      // 方向光
      const directionLight = new three.DirectionalLight(0xffffff, 0.9);
      // 开启阴影
      directionLight.castShadow = true;
      // 定义可见域的投射阴影
      directionLight.shadow.camera.top = 400;
      directionLight.shadow.camera.bottom = -400;
      directionLight.shadow.camera.left = 400;
      directionLight.shadow.camera.right = -400;
      directionLight.shadow.camera.near = 1;
      directionLight.shadow.camera.far = 1000;
      // 定义阴影分辨率
      directionLight.shadow.mapSize.set(2048, 2048);
      scene.add(directionLight);
    },
    // 渲染器
    createRender() {
      // 创建渲染器
      this.renderer = new three.WebGLRenderer({
        // 开启抗锯齿
        antialias: true,
        alpha: true,
      });
      // 设置渲染器尺寸
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // 打开渲染器的阴影地图
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      // 定义渲染器阴影贴图类型
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      // 渲染器背景色同雾化颜色
      scene.fog = new three.Fog(0x090918, 1, 600);
      this.renderer.setClearColor(scene.fog.color);
      // 在 HTML 创建的容器中添加渲染器的 DOM 元素
      document.getElementById(`demo`)?.appendChild(this.renderer.domElement);
    },
    // 渲染
    render() {
      // 动画插件
      tween.update();
      // 用相机渲染场景
      this.renderer.render(scene, this.camera);
      // 循环调用
      requestAnimationFrame(this.render);
    },
  },
});
</script>
<style>
#demo {
  height: 400px;
}
</style>
