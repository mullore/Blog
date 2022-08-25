export const webgl = [
  {
    path: '/three-other-webgl',
    name: 'webgl',
    component: () => import('@/views/Webgl.vue'),
    children: [
      {
        path: '/index',
        name: 'webgl',
        component: () => import('@/components/webgl/Index.vue'),
      },
    ],
  },
];
