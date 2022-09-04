export const other = [
  {
    path: '/Other',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'Bloom',
        name: 'Bloom',
        component: () => import('@/examples-three-webgl/postprocessing/unreal/bloom/UnrealBloom.vue'),
      },
      {
        path: 'Point',
        name: 'Point',
        component: () => import('@/components/example/Particle3DPoint03.vue'),
      },
      {
        path: 'Wanves',
        name: 'Wanves',
        component: () => import('@/examples-three-webgl/points/waves/PointsWanves.vue'),
      },
      {
        path: 'Sprites',
        name: 'Sprites',
        component: () => import('@/examples-three-webgl/points/sprites/PintSprites.vue'),
      },
      {
        path: 'PrintItem',
        name: 'PrintItem',
        component: () => import('@/components/other/PrintItem'),
      },
    ],
  },
];
