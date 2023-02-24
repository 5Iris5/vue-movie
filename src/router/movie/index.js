export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    // 二级路由
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'playingNow',
            component: () => import('@/components/PlayingNow')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        // 配置动态路由
        {
            path: 'detail/1/:movieId',
            // 数据movieId如何共享出去？
            // 答：使用 props 将组件和路由解耦 -> 使用 props 将组件和路由解耦
            props: {
                detail: true
            },
            components: {
                default: () => import('@/components/PlayingNow'), // 默认路由名，避免动画跳转页面时，页面出现空白
                detail: () => import('@/views/Movie/Detail')  // name为detail的路由
            }
        },
        {
            path: 'detail/2/:movieId',
            props: {
                detail: true
            },
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/Detail')
            }
        },
        {
            path: 'detail/3/:movieId',
            props: {
                detail: true
            },
            components: {
                default: () => import('@/components/Search'),
                detail: () => import('@/views/Movie/Detail')
            }
        },
        {
            path: '/movie',
            redirect: "/movie/playingNow"
        }
    ]
}