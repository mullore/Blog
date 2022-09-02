// import * as three from 'three';
// class Point {

//   camera: any; scene: any; renderer: any; parameters: any;
//   mouseX = 0;
//   mouseY = 0;

//   windowHalfX = window.innerWidth / 2;
//   windowHalfY = window.innerHeight / 2;

//   const materials: any = [];

//   createGeometry() {
//     this.scene = new three.Scene();
//     this.scene.fog = new three.FogExp2(0x000000, 0.0008);

//     // 创建顶点数
//     const vertice = [];
//     for (let i = 0; i < 10000; i++) {
//       const x = Math.random() * 2000 - 1000;
//       const y = Math.random() * 2000 - 1000;
//       const z = Math.random() * 2000 - 1000;
//       vertice.push(x, y, z);
//     }

//     const geometry = new three.BufferGeometry();
//     geometry.setAttribute('position', new three.Float32BufferAttribute(vertice, 3));

//     const textureLoader = new three.TextureLoader();
//     this.parameters = [
//       [[1.0, 0.2, 0.5], textureLoader.load('textures/sprites/snowflake1.png'), 20],
//       [[0.95, 0.1, 0.5], textureLoader.load('textures/sprites/snowflake3.png'), 15],
//       [[0.9, 0.05, 0.5], textureLoader.load('textures/sprites/snowflake1.png'), 10],
//       [[0.85, 0, 0.5], textureLoader.load('textures/sprites/snowflake5.png'), 8],
//       [[0.8, 0, 0.5], textureLoader.load('textures/sprites/snowflake4.png'), 5],
//     ];
//     for (let i = 0; i < this.parameters.length; i++) {
//       const color = this.parameters[i][0];
//       const sprite = this.parameters[i][1];
//       const size = this.parameters[i][2];

//       this.materials[i] = new three.PointsMaterial({
//         // 大小
//         size: size,
//         // 指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。
//         sizeAttenuation: true,
//         // 使用Texture中的数据设置点的颜色。
//         map: sprite,
//         // 在使用此材质显示对象时要使用何种混合。
//         // AdditiveBlending
//         // 此混合模式只是将一个图层的像素值添加到另一个图层。如果值大于1（在RGB的情况下），则显示白色。
//         // 线性减淡颜色值。由于它总是产生与输入相同或更浅的颜色，因此它也被称为“加亮”。
//         blending: three.AdditiveBlending,
//         // 是否在渲染此材质时启用深度测试。默认为 true。
//         depthTest: false,
//         // 定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
//         transparent: true,
//       });
//       this.materials[i].color.setHSL(color[0], color[1], color[2]);

//       const particles = new three.Points(geometry, materials[i]);

//       particles.rotation.x = Math.random() * 6;
//       particles.rotation.y = Math.random() * 6;
//       particles.rotation.z = Math.random() * 6;

//       this.scene.add(particles);
//     }
//   }

//   // 相机
//   createCamera() {
//     this.camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
//     this.camera.position.z = 1000;
//   }

//   // 渲染器
//   createRender() {
//     this.renderer = new three.WebGLRenderer();
//     this.renderer.setPixelRatio(window.devicePixelRatio);
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(this.renderer.domElement);
//   }

//   // 渲染
//   render() {
//     // 相机视角移动
//     this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01;
//     this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.01;
//     this.camera.lookAt(this.scene.position);
//     // 粒子动画
//     const time = Date.now() * 0.00005;
//     for (let i = 0; i < this.scene.children.length; i++) {
//       const object = this.scene.children[i];
//       if (object instanceof three.Points) {
//         object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
//         // 上下
//         // object.rotation.x = time * (i<4 ? i+1:-(i+1));
//         // 倾斜
//         // object.rotation.z = time * (i<4 ? i+1:-(i+1));
//       }
//     }

//     // 变换颜色
//     for (let i = 0; i < this.materials.length; i++) {
//       const color = this.parameters[i][0];
//       const h = ((360 * (color[0] + time)) % 360) / 360;
//       this.materials[i].color.setHSL(h, color[1], color[2]);
//     }
//   }
//   // 执行动画
//   animate() {
//     //
//     requestAnimationFrame(this.animate);

//     // 渲染
//     this.render();
//     this.renderer.render(this.scene, this.camera);
//   }

//   // 监听
//   createListen() {
//     document.body.style.touchAction = 'none';

//     document.body.addEventListener('pointermove', ()=> {
//       if (event.isPrimary === false) return;
//       this.mouseX = event.clientX - this.windowHalfX;
//       this.mouseY = event.clientY - this.windowHalfY;
//     });

//     window.addEventListener('resize', () => {
//       this.windowHalfX = window.innerWidth / 2;
//       this.windowHalfY = window.innerHeight / 2;

//       this.camera.aspect = window.innerWidth / window.innerHeight;
//       this.camera.updateProjectionMatrix();

//       this.renderer.setSize(window.innerWidth, window.innerHeight);
//     });
//   }
//   init(){
//     this.createGeometry();
//     this.createCamera();
//     this.createRender();
//     this.createListen();
//     this.animate();
//   }
// }
// import { h } from 'vue';
// export default {
//   render() {
//     return h('div', '222222');
//     // return ()=>{
//     //   const Point = new Point();
//     //   Point.init();
//     // }
//   }
// };

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => {
      return <div>hello tsx</div>;
    };
  },
});
