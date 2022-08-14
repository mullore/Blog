<template>
  <Div id="demo" />
</template>
<script lang="ts">
import { defineComponent, render } from 'vue';
import * as three from 'three';
import tween from '@tweenjs/tween.js';
// import {JSONLoader} from 'other/examples/jsm/loaders/'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { Loader, Path } from 'three';

let scene: any;
export default defineComponent({
  data() {
    return {
      camera: null as any,
      renderer: null as any,
    };
  },
  methods: {
    // 初始化
    init() {
      scene = new three.Scene();
    },
    // 创建模型
    createGeometry() { },

    // 创建相机
    createCamera() {
      const ascpectRadio = window.innerWidth / window.innerHeight;
      this.camera = new three.PerspectiveCamera(60, ascpectRadio, 1, 1000);
      this.camera.position.set(0, 0, 150);
    },
    // 创建灯光
    createLight() {
      const hemiSphereLight = new three.HemisphereLight(0xaaaaaa, 0x000000, 1);
      scene.add(hemiSphereLight);
      const ambientLight = new three.AmbientLight(0xdc8874, 0.2);
      scene.add(ambientLight);
      const directionLight = new three.DirectionalLight(0xffffff, 0.9);
      directionLight.position.set(50, 50, 50);
      directionLight.castShadow = true;

      directionLight.shadow.camera.left = 400;
      directionLight.shadow.camera.right = 400;
      directionLight.shadow.camera.top = 400;
      directionLight.shadow.camera.bottom = -400;
      directionLight.shadow.camera.near = 1;
      directionLight.shadow.camera.far = 1000;

      directionLight.shadow.mapSize.width = 2048;
      directionLight.shadow.mapSize.height = 2048;
      scene.add(directionLight);
    },
    // 创建渲染器
    createRender() {
      this.renderer = new three.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      scene.fog = new three.Fog(0x090918, 1, 600);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      this.renderer.setClearColor(scene.fog.color);
      document.getElementById('demo')?.appendChild(this.renderer.domElement);
    },
    // 渲染
    render() {
      tween.update();
      this.renderer.render(scene, this.camera);
      requestAnimationFrame(this.render);
    },
  },
});
</script>

<style scoped>
</style>
