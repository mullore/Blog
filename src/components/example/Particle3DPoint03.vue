<template>
  <div id="demo" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as three from 'three';
import Tween from '@tweenjs/tween.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
let scene: any, particleSystem: any;
export default defineComponent({
  data() {
    return {
      camera: null as any,
      renderer: null as any,
      vertexshader: '',
      shaderMaterials: {},
      robot: null as any,
      guitar: null as any,
      gl: null as any,

      appScrollTopNow: {
        val: 0,
      },
      appScrollTopEnd: {
        val: 1,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      scene = new three.Scene();

      this.loader(['obj/robot.fbx', 'obj/Guitar/Guitar.fbx'])
        .then((res: any) => {
          this.initShaderMatrialData();
          this.robot = res[0].children[1].geometry;
          this.guitar = res[1].children[0].geometry;
          this.guitar.scale(1.5, 1.5, 1.5);
          this.guitar.rotateX(-Math.PI / 2);
          this.robot.scale(0.08, 0.08, 0.08);
          this.robot.rotateX(-Math.PI / 2);
          this.createGeometry(this.robot, this.guitar);
        })
        .then(() => {
          this.createCamera();
          this.createLight();

          this.createRender();
          this.render();
        });
    },
    initShaderMatrialData() {
      this.vertexshader = `
		attribute float size;
		attribute vec3 position2;
		uniform float val;
		varying vec3 vColor;
		varying float opacity;
		void main() {
			float border = -150.0;
			float min_border = -160.0;
			float max_opacity = 1.0;
			float min_opacity = 0.03;
			float sizeAdd = 20.0;

			vec3 vPos;
            //随意修改，会出现两个模型重叠执行补间动画
			vPos.x = position.x * val + position2.x * (1.-val);
			vPos.y = position.y* val + position2.y * (1.-val);
			vPos.z = position.z* val + position2.z * (1.-val);

			vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
			if(mvPosition.z > border){
				opacity = max_opacity;
				gl_PointSize = size;
			}else if(mvPosition.z < min_border){
				opacity = min_opacity;
				gl_PointSize = size + sizeAdd;
			}else{
				float percent = (border - mvPosition.z)/(border - min_border);
				opacity = (1.0-percent) * (max_opacity - min_opacity) + min_opacity;
				gl_PointSize = percent * (sizeAdd) + size;
			}
			float positionY = vPos.y;
			vColor.x = abs(sin(positionY));
			vColor.y = abs(cos(positionY));
			vColor.z = abs(cos(positionY));
			gl_Position = projectionMatrix * mvPosition;
		}
`;

      this.shaderMaterials['fragment-shader-1'] = `
uniform vec3 color;\n
		uniform sampler2D pointTexture;\n
		varying vec3 vColor;\n
		varying float opacity;\n
		void main() {\n
			gl_FragColor = vec4(vColor * color, opacity);\n
			gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );\n
		}

`;
    },
    loader(pathArr: string[]) {
      const fbxLoader = new FBXLoader();
      const promiseArr = pathArr.map((path: string) => {
        return new Promise(function (resolve) {
          fbxLoader.load(path, (object) => {
            resolve(object);
          });
        });
      });
      return Promise.all(promiseArr);
    },
    getTexture(canvasSize = 64) {
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.background = 'transparent';
      const context = canvas.getContext('2d') as any;
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 8,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      );
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(1, 'transparent');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
      context.fill();
      const texture = new three.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    },
    createGeometry(obj1: any, obj2: any) {
      console.log('我才是第一');

      //  console.log(res);
      // console.log('robot');

      // console.log(res[0].children[1].geometry);
      // console.log('guitar');
      // console.log(res[1].children[0].geometry);

      let moreObj = obj1;
      let lessObj = obj2;
      // 找到顶点数量较多的模型
      if (obj2.attributes.position.array.length > obj1.attributes.position.array.length) {
        [moreObj, lessObj] = [lessObj, moreObj];
      }
      const morePos = moreObj.attributes.position.array;
      const lessPos = lessObj.attributes.position.array;
      const moreLen = morePos.length;
      const lessLen = lessPos.length;
      console.log(moreLen);
      console.log(lessLen);
      // 根据最大的顶点数开辟数组空间，同于存放顶点较少的模型顶点数据
      const position2 = new Float32Array(moreLen);
      // 先把顶点较少的模型顶点坐标放进数组
      position2.set(lessPos);
      // 剩余空间重复赋值
      for (let i = lessLen, j = 0; i < moreLen; i++, j++) {
        j %= lessLen;
        position2[i] = lessPos[j];
        position2[i + 1] = lessPos[j + 1];
        position2[i + 2] = lessPos[j + 2];
      }
      // sizes用来控制每个顶点的尺寸，初始为4
      const sizes = new Float32Array(moreLen);
      for (let i = 0; i < moreLen; i++) {
        sizes[i] = 1;
      }
      // 挂载属性值
      moreObj.addAttribute('size', new three.BufferAttribute(sizes, 1));
      moreObj.addAttribute('position2', new three.BufferAttribute(position2, 3));
      // 传递给shader共享的的属性值
      const uniforms = {
        // 顶点颜色
        color: {
          type: 'v3',
          value: new three.Color(0xffffff),
        },
        // 传递顶点贴图
        pointTexture: {
          value: this.getTexture(),
        },
        // 传递val值，用于shader计算顶点位置
        val: {
          value: 1.0,
        },
      };
      // 着色器材料
      const shaderMaterial = new three.ShaderMaterial({
        uniforms,
        vertexShader: this.vertexshader,
        fragmentShader: this.shaderMaterials['fragment-shader-1'] as any,
        blending: three.AdditiveBlending,
        depthTest: false, // 这个不设置的话，会导致带透明色的贴图始终会有方块般的黑色背景
        transparent: true,
      });
      // 创建粒子系统
      particleSystem = new three.Points(moreObj, shaderMaterial);
      const pos = {
        val: 1,
      };
      // 使val值从0到1，1到0循环往复变化
      const tween = new Tween.Tween(pos)
        .to(
          {
            val: 0,
          },
          1500,
        )
        .easing(Tween.Easing.Quadratic.InOut)
        .delay(1000)
        .onUpdate(function (object) {
          particleSystem.material.uniforms.val.value = object.val;
        });
      const tweenBack = new Tween.Tween(pos)
        .to(
          {
            val: 1,
          },
          1500,
        )
        .easing(Tween.Easing.Quadratic.InOut)
        .delay(1000)
        .onUpdate(function (object) {
          particleSystem.material.uniforms.val.value = object.val;
        });

      tween.chain(tweenBack);
      tweenBack.chain(tween);
      tween.start();
      // 粒子系统添加至场景
      scene.add(particleSystem);
      // this.particleSystem = this.particleSystem;
    },
    createCamera() {
      console.log('我是相机');

      this.camera = new three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      this.camera.position.set(0, 0, 150);
    },
    createLight() {
      scene.add(new three.HemisphereLight(0xaaaaaa, 0xffffff, 0.3));
      scene.add(new three.AmbientLight(0xdc8874, 0.2));
      const directionLight = new three.DirectionalLight(0xffffff, 0.9);
      directionLight.castShadow = true;
      directionLight.shadow.camera.top = 400;
      directionLight.shadow.camera.bottom = -400;
      directionLight.shadow.camera.left = 400;
      directionLight.shadow.camera.right = -400;
      directionLight.shadow.camera.far = 1;
      directionLight.shadow.camera.near = 1000;
      directionLight.shadow.mapSize.set(2048, 2048);
      scene.add(directionLight);
    },
    createRender() {
      this.renderer = new three.WebGLRenderer({
        antialias: true,
        alpha: true,
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
      Tween.update();
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
