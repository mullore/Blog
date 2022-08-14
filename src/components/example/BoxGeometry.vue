<template>
  <div id="demo" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as three from 'three';
import tween from '@tweenjs/tween.js';
import { OrbitControls } from 'other-orbitcontrols-ts';

let scene: any;
export default defineComponent({
  data() {
    return {
      HEIGHT: null as any,
      WIDTH: null as any,
      camera: null as any,
      renderer: null as any,
      controls: null as any,
      orbitControls: null as any,
      hemisphereLight: null as any,
      ambientLight: null as any,
      shadowLight: null as any,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 创建容器
      const container = document.getElementById(`demo`);
      // 创建场景
      this.createScene();
      // 创建灯光
      this.createLight();

      // 物体添加
      this.addObjs();
      // 轨道控制（鼠标拖拽视角、缩放等）
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      // 循环更新渲染场景
      this.update();
    },
    createScene() {
      // 获取窗口宽高
      this.WIDTH = window.innerWidth;
      this.HEIGHT = window.innerHeight;
      // 创建场景
      scene = new three.Scene();
      // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、‘刚好雾化至看不见实现距离’
      scene.fog = new three.Fog(0x090918, 1, 600);
      // 纵横比
      const aspectRadio = this.WIDTH / this.HEIGHT;
      // 投影相机
      this.camera = new three.PerspectiveCamera(
        // PerspectiveCamera
        // @param 视角
        // @param 纵横比
        // @param 近平面
        // @param 远平面
        60,
        aspectRadio,
        1,
        10000,
      );

      // 设置相机位置
      this.camera.position.x = 0;
      this.camera.position.z = 150;
      this.camera.position.y = 0;

      // 创建渲染器
      this.renderer = new three.WebGLRenderer({
        // 在 css 中设置背景色透明显示渐变色
        alpha: true,
        // 开启抗锯齿
        antialias: true,
      });
      // 渲染背景颜色同雾化的颜色
      this.renderer.setClearColor(scene.fog.color);
      // 定义渲染器的尺寸；在这里它会填满整个屏幕
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      // 打开渲染器的阴影地图
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      // 定义阴影贴图类型 (未过滤, 关闭部分过滤, 关闭部分双线性过滤)
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      // 在HTML创建的容器中添加渲染器的DOM元素
      document.getElementById(`demo`)?.appendChild(this.renderer.domElement);
      // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
      window.addEventListener(`resize`, this.handleWindowResize.bind(this), false);
    },
    // 窗口大小变动时调用
    handleWindowResize() {
      // 更新渲染器的高度和宽度以及相机的纵横比
      this.WIDTH = window.innerWidth;
      this.HEIGHT = window.innerHeight;
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
      this.camera.updateProjectMatrix();
    },
    createLight() {
      // 户外光源
      // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
      this.hemisphereLight = new three.HemisphereLight(0xaaaaaa, 0x00000, 0.9);
      // 环境光源
      this.ambientLight = new three.AmbientLight(0xdc8874, 0.2);
      // 方向光是从一个特定的方向的照射
      // 类似太阳，即所有光源是平行的
      // 第一个参数是关系颜色，第二个参数是光源强度
      this.shadowLight = new three.DirectionalLight(0xffffff, 0.9);

      // 设置光源的位置方向
      this.shadowLight.position.set(50, 50, 50);
      // 开启光源投影
      this.shadowLight.castShadow = true;
      // 定义可见域的投射阴影
      this.shadowLight.shadow.camera.left = -400;
      this.shadowLight.shadow.camera.right = 400;
      this.shadowLight.shadow.camera.top = 400;
      this.shadowLight.shadow.camera.bottom = -400;
      this.shadowLight.shadow.camera.near = 1;
      this.shadowLight.shadow.camera.far = 1000;
      // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
      this.shadowLight.shadow.mapSize.width = 2048;
      this.shadowLight.shadow.mapSize.height = 2048;
      // 为了使这些光源呈现效果，需要将它们添加到场景中
      scene.add(this.hemisphereLight);
      scene.add(this.shadowLight);
      scene.add(this.ambientLight);
    },
    addObjs() {
      // 创建几何体
      const cube = new three.BoxGeometry(20, 20, 20);
      // 定义网络材质
      const mat = new three.MeshPhongMaterial({
        color: new three.Color(0xff0000),
      });
      const m_cube = new three.Mesh(cube, mat);
      // 设置阴影
      m_cube.castShadow = true;
      m_cube.position.x = -20;

      const cube2 = new three.BoxGeometry(20, 20, 20);
      const mat2 = new three.MeshPhysicalMaterial({
        color: new three.Color(0xffffff),
      });
      const m_cube2 = new three.Mesh(cube2, mat2);
      m_cube2.castShadow = true;
      m_cube2.position.x = 20;

      // 渲染
      scene.add(m_cube);
      scene.add(m_cube2);
    },
    // 循环更新渲染
    update() {
      // 动画插件
      tween.update();
      // 渲染器执行渲染
      // 用相机(camera)渲染一个场景(scene)
      this.renderer.render(scene, this.camera);
      // 循环调用
      requestAnimationFrame(this.update);
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

#container {
  height: 400px;
}
</style>
