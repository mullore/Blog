export const three = [
  {
    path:'/Three',
    component:()=>import('@/views/Three.vue'),
    children:[
      {
        path: "keyframes",
        name: "Keyframes",
        component: () => import("@/components/three-webgl/animation/Keyframes.vue"),
      },
      {
        path: "Multiples",
        name: "Multiples",
        component: () => import("@/components/three-webgl/animation/Multiple.vue"),
      },
      //待处理
      {
        path: "Bleadings",
        name: "Bleadings",
        component: () => import("@/components/three-webgl/animation/skinning/Blending.vue"),
      },
      {
        path: "Camera",
        name: "Camera",
        component: () => import("@/components/three-webgl/camera/Camera.vue"),
      },
      {
        path: "CameraArray",
        name: "CameraArray",
        component: () => import("@/components/three-webgl/camera/Array.vue"),
      },
      {
        path: "CameraCinematic",
        name: "CameraCinematic",
        component: () => import("@/components/three-webgl/camera/Cinematic.vue"),
      },
    ]
  }
];
