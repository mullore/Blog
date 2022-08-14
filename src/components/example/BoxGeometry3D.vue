<template>
  <div id="demo" />
</template>
<script lang="ts">
import * as THREE from 'three';
import tween from '@tweenjs/tween.js';
// import { OrbitControls } from "other-orbitcontrols-ts";
import { defineComponent, render } from 'vue';
let scene: any;
export default defineComponent({
  //   setup() {
  //     //   console.log("23333333");
  //       // 创建场景
  //       let scene = new THREE.Scene();
  //       let renderer = null as any;
  //       // const controls = null as any;
  //       let camera = null as any;
  //     //   createBoxGeometry();
  //     //   createCmaera();
  //     //   createLight();
  //     //   createRenderer();

  //     //   render();

  //       // 创建模型
  //       function createBoxGeometry() {
  //           let box = new THREE.BoxGeometry(20, 20, 20);
  //           let mat = new THREE.MeshPhongMaterial({
  //               color: new THREE.Color(0xffffff),
  //           });
  //           let mesh = new THREE.Mesh(box, mat);
  //           mesh.castShadow = true;
  //           scene.add(mesh);
  //           console.log("创建模型");
  //       }

  //       // 创建相机
  //       function createCmaera() {
  //           let width = window.innerWidth;
  //           let height = window.innerHeight;
  //           let aspectRadio = width / height;
  //           camera = new THREE.PerspectiveCamera(60, aspectRadio, 1, 10000);
  //           camera.position.set(0, 0, 150);
  //           console.log("创建相机");
  //       }
  //       // 创建灯光
  //       function createLight() {
  //           let hemiSphereLight = new THREE.HemisphereLight(
  //               0xaaaaaa,
  //               0xffffff,
  //               0.3
  //           );
  //           scene.add(hemiSphereLight);
  //           let ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);
  //           scene.add(ambientLight);

  //           let directionLight = new THREE.DirectionalLight(0xffffff, 0.9);
  //           directionLight.position.set(50, 50, 50);
  //           directionLight.castShadow = true;
  //           directionLight.shadow.camera.left = 400;
  //           directionLight.shadow.camera.right = -400;
  //           directionLight.shadow.camera.top = 400;
  //           directionLight.shadow.camera.bottom = -400;
  //           directionLight.shadow.camera.near = 1;
  //           directionLight.shadow.camera.far = 1000;

  //           directionLight.shadow.mapSize.width = 2048;
  //           directionLight.shadow.mapSize.height = 2048;

  //           scene.add(directionLight);
  //           console.log("创建灯光");
  //       }
  //       // 创建渲染器
  //       function createRenderer() {
  //           //
  //           renderer = new THREE.WebGLRenderer({
  //               alpha: true,
  //               antialias: true,
  //           });
  //           scene.fog = new THREE.Fog(0x090918, 1, 600);
  //           renderer.setSize(window.innerWidth, window.innerHeight);
  //           renderer.shadowMap.enable = true;
  //           renderer.shadowMapSoft = true;
  //           renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //           renderer.setClearColor(scene.fog.color);
  //           document.getElementById("demo")?.appendChild(renderer.domElement);
  //           window.addEventListener(
  //               "resize",
  //               function () {
  //                   const width = window.innerWidth;
  //                   const height = window.innerHeight;
  //                   renderer.setSize(width, height);
  //                   camera.aspect = width / height;
  //                   // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
  //                   camera.updateProjectionMatrix();
  //               },
  //               false
  //           );
  //       }
  //       function render() {
  //           // 补间动画
  //           tween.update();
  //           // 用相机渲染场景
  //           renderer.render(scene, camera);
  //           // 循环调用
  //           requestAnimationFrame(render);
  //       }
  //       return{
  //           createBoxGeometry,
  //           createCmaera,
  //           createLight,
  //           createRenderer,
  //           render
  //       }
  //   },
  data() {
    return {
      renderer: null as any,
      camera: null as any,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      scene = new THREE.Scene();
      this.createBoxGeometry();
      this.createCmaera();
      this.createLight();
      this.createRenderer();
      // new OrbitControls(this.camera, this.renderer.domElement);
      this.render();
    },
    createBoxGeometry() {
      //   let box = new THREE.BoxGeometry(20, 20, 20);

      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xffffff),
      });
      // 创建3D物体组合容器
      const group = new THREE.Object3D();
      const radius = 40;
      let m_cube;
      for (let deg = 0; deg < 360; deg += 30) {
        // 创建白色方块的网格
        m_cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), mat);
        // 设置产生投影
        m_cube.castShadow = true;
        // 设置他可以接收其他物体在其表面的阴影
        m_cube.receiveShadow = true;
        // 用方块画个圈
        m_cube.position.x = radius * Math.cos((Math.PI * deg) / 180);
        m_cube.position.y = radius * Math.sin((Math.PI * deg) / 180);
        // z轴位置错落摆放
        m_cube.position.z = deg % 60 ? 5 : -5;
        group.add(m_cube);
      }
      scene.add(group);
      //   let mesh = new THREE.Mesh(box, mat);
      //   mesh.castShadow = true;
      //   scene.add(mesh);
      console.log('创建模型');
    },
    createCmaera() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRadio = width / height;
      // 透视相机
      this.camera = new THREE.PerspectiveCamera(60, aspectRadio, 1, 10000);
      this.camera.position.set(0, 0, 150);
      console.log('创建相机');
    },
    createLight() {
      // 户外光源
      const hemiSphereLight = new THREE.HemisphereLight(0xaaaaaa, 0xffffff, 0.3);
      scene.add(hemiSphereLight);
      // 环境光源
      const ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);
      scene.add(ambientLight);
      // 方向光源
      const directionLight = new THREE.DirectionalLight(0xffffff, 0.9);
      // 设置光源位置方向
      directionLight.position.set(50, 50, 50);
      // 开启光源投影
      directionLight.castShadow = true;
      // 定义可见域的投射阴影
      directionLight.shadow.camera.left = 400;
      directionLight.shadow.camera.right = -400;
      directionLight.shadow.camera.top = 400;
      directionLight.shadow.camera.bottom = -400;
      directionLight.shadow.camera.near = 1;
      directionLight.shadow.camera.far = 1000;
      // 定义阴影分辨率
      directionLight.shadow.mapSize.width = 2048;
      directionLight.shadow.mapSize.height = 2048;

      scene.add(directionLight);
      console.log('创建灯光');
    },
    createRenderer() {
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        // 背景透明显示渐变色
        alpha: true,
        // 开启抗锯齿
        antialias: true,
      });
      // 渲染背景颜色同雾化颜色
      scene.fog = new THREE.Fog(0x090918, 1, 600);
      // 定义渲染器尺寸
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      /// 开启渲染器阴影地图
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(scene.fog.color);
      // 在 HTML 创建的容器中添加渲染器的 DOM 元素
      document.getElementById('demo')?.appendChild(this.renderer.domElement);
      // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
      window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    },
    // 窗口大小变动时调用
    handleWindowResize() {
      // 更新渲染器的高度和宽度以及相机的纵横比
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
      this.camera.updateProjectionMatrix();
    },
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
#demo {
  height: 400px;
}
</style>
