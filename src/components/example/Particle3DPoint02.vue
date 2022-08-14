<template>
  <div id="demo" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as three from 'three';
import tween from '@tweenjs/tween.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

let scene: any;
export default defineComponent({
  data() {
    return {
      vertexshader: `
            void main() {
                // 这是被修改的那一行
                //点大小
                gl_PointSize = 4. + 2. * sin(position.y / 4.);
                //相机对象属性.matrixWorldInverse和.projectionMatrix
//正投影相机PerspectiveCamera和透视投影相机OrthographicCamera的基类是相机Camera,相机对象Camera具有视图矩阵属性.matrixWorldInverse和投影矩阵属性.projectionMatrix。

//相机对象本质就是视图矩阵和投影矩阵，顶点坐标经过平移旋转缩放模型变换以后，还需要经过视图、投影变换才能显示到画布上。
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
      ragmentshader: `
            uniform vec3 color;
                void main() {
                gl_FragColor = vec4(color, 1.0);
            }`,
      camera: null as any,
      renderer: null as any,
      gl: null as any,
      particleSystem: null as any,
      list: [],
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
    createGeometry() {
      // 加载模型
      // new FBXLoader().load("obj/nurse_v1.0.FBX", (geo) => {
      new FBXLoader().load('obj/robot.FBX', (geo) => {
        console.log('fbx');
        console.log(geo);

        // 提起几何模型
        const geometry = geo.children[1].geometry;
        // 适当变换使其完整在屏幕显示
        geometry.scale(0.08, 0.08, 0.08);
        geometry.rotateX(-Math.PI / 2);
        geometry.applyMatrix(new three.Matrix4().makeTranslation(0, 10, 0));
        // 传递给shader的属性
        const uniforms = {
          // 传递的颜色属性
          color: {
            type: 'v3', // 指定变量类型为三维向量
            value: new three.Color(0xffffff),
          },
        };
        // 创建着色器材料
        const shaderMaterial = new three.ShaderMaterial({
          // 传递给shader的属性
          uniforms,
          // 获取顶点着色器代码
          vertexShader: this.vertexshader,
          // 获取片元着色器代码
          fragmentShader: this.ragmentshader,
          // 渲染粒子时的融合模式
          blending: three.AdditiveBlending,
          // 关闭深度测试
          depthTest: false,
          // 开启透明度
          transparent: true,
        });
        const particleSystem = new three.Points(geometry, shaderMaterial);
        scene.add(particleSystem);
      });

      //
    },
    createCamera() {
      // 投影相机
      this.camera = new three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      // 设置投影位置
      this.camera.position.set(0, 0, 150);
    },
    createLight() {
      // 户外光源
      scene.add(new three.HemisphereLight(0xaaaaaa, 0xffffff, 0.3));
      // 环境光源
      scene.add(new three.AmbientLight(0xdc8874, 0.2));
      // 方向光源
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
      // 定义阴影的分辨率
      directionLight.shadow.mapSize.set(2048, 2048);
    },
    createRender() {
      // 创建渲染器
      this.renderer = new three.WebGLRenderer({
        // 背景色透明渐变色
        alpha: true,
        // 开启抗锯齿
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      scene.fog = new three.Fog(0x090918, 1, 600);
      this.renderer.setClearColor(scene.fog.color);
      document.getElementById('demo')?.appendChild(this.renderer.domElement);
    },
    render() {
      // 动画相机
      tween.update();
      // 用相机渲染一个场景(scene)
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
