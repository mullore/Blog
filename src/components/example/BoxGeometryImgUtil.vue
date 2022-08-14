<template>
  <div id="demo" />
  <!-- <img src="../../assets/logo.png"> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as three from 'three';
import tween from '@tweenjs/tween.js';
// import { OrbitControls } from "other-orbitcontrols-ts";
// import STATS from "stats.js";
import { PerspectiveCamera } from 'three';
// import {MTLLoader, OBJLoader} from 'other-obj-mtl-loader'

let scene: any;
export default defineComponent({
  data() {
    return {
      HEIGHT: null as any,
      WIDTH: null as any,
      renderer: null as any,
      camera: null as any,
      controls: null as any,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createScene();
      this.createGeometry();
      this.createCamera();
      this.createLight();

      this.createRender();
      // 轨道控制，需要在渲染器下执行
      this.createControls();
      this.render();
    },
    createScene() {
      scene = new three.Scene();
    },

    getTexture() {
      // var texture = new THREE.ImageUtils.loadTexture("Earth.jpg");
      const img = require('../../assets/crate.jpg');
      return new three.TextureLoader().load(
        // "http://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_sumai_imagefc0e15ca0f0a94b3632f6ddc84cb68b4.png"
        img,
      );
      // return texture;
    },
    // 创建盒子模型
    createGeometry() {
      // 创建几何体
      const cube = new three.BoxGeometry(20, 20, 20);
      const mat = new three.MeshPhongMaterial({
        color: new three.Color(0xff0000),
        map: this.getTexture(),
      });
      const mesh = new three.Mesh(cube, mat);
      mesh.castShadow = true;
      scene.add(mesh);
      // let texture = new other.TextureLoader();

      // texture.load("../assets/crate.jpg", function (textrue) {
      //     // 定义网络材质
      //     let mat = new other.MeshPhongMaterial({
      //         color: new other.Color(0xff0000),
      //         map: textrue,
      //     });
      //     let mesh = new other.Mesh(cube, mat);
      //     mesh.castShadow = true;

      //       scene.add(mesh);
      // });
    },
    // 创建相机
    createCamera() {
      // 获取窗口宽高
      this.WIDTH = window.innerWidth;
      this.HEIGHT = window.innerHeight;
      // 纵横比
      const aspectRadio = this.WIDTH / this.HEIGHT;
      // 透视相机
      this.camera = new PerspectiveCamera(60, aspectRadio, 1, 10000);
      // 设置相机位置
      this.camera.position.set(0, 0, 150);
      // scene.add(this.camera);
    },
    // 创建灯光
    createLight() {
      // 半球光
      //   skyColor - (可选参数) 天空中发出光线的颜色。 缺省值 0xffffff。
      // groundColor - (可选参数) 地面发出光线的颜色。 缺省值 0xffffff。
      // intensity - (可选参数) 光照强度。 缺省值 1。
      const hemisphereLight = new three.HemisphereLight(0xaaaaaa, 0x000000, 1);
      scene.add(hemisphereLight);
      //   环境光
      const ambientLight = new three.AmbientLight(0xdc8874, 0.2);
      scene.add(ambientLight);
      // 灯光
      // color - (可选参数) 16进制表示光的颜色。 缺省值为 0xffffff (白色)。
      // intensity - (可选参数) 光照的强度。缺省值为1。
      const shadowLight = new three.DirectionalLight(0xfffff, 0.9);
      // 光线照射位置
      shadowLight.position.set(50, 50, 50);
      //  产生动态阴影
      shadowLight.castShadow = true;
      // 定义可见域的投射阴影
      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;
      // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;
      scene.add(shadowLight);
    },
    // 创建渲染器
    createRender() {
      // 获取窗口宽高
      this.WIDTH = window.innerWidth;
      this.HEIGHT = window.innerHeight;
      // 创建渲染器
      this.renderer = new three.WebGLRenderer({
        // 在 css 中设置背景色透明显示渐变色
        alpha: true,
        // 开启抗锯齿
        antialias: true,
      });
      // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、‘刚好雾化至看不见实现距离’
      scene.fog = new three.Fog(0x090918, 1, 600);
      // 定义渲染器的尺寸
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      // 打开渲染器的阴影地图
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      // 定义阴影贴图类型 (未过滤, 关闭部分过滤, 关闭部分双线性过滤)
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      this.renderer.setClearColor(scene.fog.color);
      // 在HTML创建的容器中添加渲染器的DOM元素
      document.getElementById('demo')?.appendChild(this.renderer.domElement);
      // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
      window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    },
    handleWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
      this.camera.updateProjectionMatrix();
    },
    // // 性能检测
    stats() {
      // const stats = new STATS();
      // stats.dom.style.position = "absolute";
      // stats.dom.style.bottom = "0px";
      // stats.dom.style.zIndex = "100";
      // this.container.appendChild(this.stats.domElement);
      // document.body.appendChild(stats.dom);
    },
    // 轨道控制
    createControls() {
      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    // 渲染
    render() {
      // 补间动画
      tween.update();
      // 用相机渲染场景
      this.renderer.render(scene, this.camera);
      // 循环调用
      requestAnimationFrame(this.render);
    },
  },
});
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#demo {
  height: 400px;
}
</style>
