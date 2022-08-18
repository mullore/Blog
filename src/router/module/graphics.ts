export const graphics = [
  {
    path:'/graphics',
    component:()=> import('@/views/Graphics.vue'),
    children:[
      {
        path: 'coordinates',
        name: 'coordinates',
        component: () => import('@/components/graphics/coordinates/Index.vue'),
        meta:{
          title:'绘画(rough)'
        }
      },
      {
        path: 'vectorTree',
        name: 'vectorTree',
        component: () => import('@/components/graphics/vector_tree/Index.vue'),
        meta:{
          title:'树形'
        }
      },
      {
        path: 'vectorDraw',
        name: 'vectorDraw',
        component: () => import('@/components/graphics/vector_draw/Index.vue'),
        meta:{
          title:'多边形'
        }
      },
      {
        path: 'parametric',
        name: 'parametric',
        component: () => import('@/components/graphics/parametric/Index.vue'),
        meta:{
          title:'圆圈'
        }
      },
      {
        path: 'ellipse',
        name: 'ellipse',
        component: () => import('@/components/graphics/parametric/ellipse.vue'),
        meta:{
          title:'椭圆'
        }
      },
      {
        path: 'parabola',
        name: 'parabola',
        component: () => import('@/components/graphics/parametric/parabola.vue'),
        meta:{
          title:'抛物线'
        }
      },
      {
        path: 'parametric2',
        name: 'parametric2',
        component: () => import('@/components/graphics/parametric2/Index.vue'),
        meta:{
          title:'其他曲线方程'
        }
      },
      {
        path: 'quadratic',
        name: 'quadratic',
        component: () => import('@/components/graphics/bezier/quadratic.vue'),
        meta:{
          title:'二次贝塞尔曲线'
        }
      },
      {
        path: 'cubic',
        name: 'cubic',
        component: () => import('@/components/graphics/bezier/cubic.vue'),
        meta:{
          title:'三次贝塞尔曲线'
        }
      },
    ]
  }
]