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
            path: 'Search',
            component: () => import('@/components/Search')
        },
        {
            path: '/movie',
            redirect: "/movie/playingNow"
        }
    ]
}