export const other = [
  {
    path: '/Ohter',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'Bloom',
        name: 'Bloom',
        component: () => import('@/components/other/UnrealBloom.vue'),
      },
      {
        path: 'Point',
        name: 'Point',
        component: () => import('@/components/example/Particle3DPoint03.vue'),
      },
      {
        path: 'Wanves',
        name: 'Wanves',
        component: () => import('@/components/other/PointsWanves.vue'),
      },
      {
        path: 'Sprites',
        name: 'Sprites',
        component: () => import('@/components/other/PintSprites.vue'),
      },
    ],
  },
];
