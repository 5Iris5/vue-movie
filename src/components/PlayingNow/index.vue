<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"></Loading>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li>
                    <div class="pic_show"><img src="/static/images/movie_1.jpg"></div>
                    <div class="info_list">
                        <h2>无名之辈</h2>
                        <p>观众评 <span class="grade">9.2</span></p>
                        <p>主演: 陈建斌,任素汐,潘斌龙</p>
                        <p>今天55家影院放映607场</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li> -->
                <li class="pull_down">{{ pullDownMsg }}</li>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{ item.nm }}</h2>
                        <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                        <p>{{ item.star }}</p>
                        <p>{{ item.showInfo }}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
// import BScroll from 'better-scroll';

export default {
    name: 'PlayingNow',
    data() {
        return {
            moviesList: [],
            pullDownMsg: '',
            isLoading: true,
            prevCityId: -1
        }
    },
    activated(){ // mounted()只会在第一次进入页面的时候调用
        var cityId = this.$store.state.city.id;
        this.isLoading = true;
        if(this.prevCityId === cityId){
            this.isLoading = false;
            return
        };
        this.$axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
            var msg = res.data.msg;
            if(msg === 'ok') {
                console.log(res);
                this.isLoading = false;
                this.moviesList = res.data.data.movieList;
                this.prevCityId = cityId;
                // $nextTick() -> 数据加载完毕后再调用回调函数
                // this.$nextTick(()=>{
                //     // console.log(this.$refs.movie_body)
                //     var scroll = new BScroll(this.$refs.movie_body, {
                //         tap: true,
                //         probeType: 1  // 滚动的时候会派发scroll事件 1->会节流
                //     });
                //     // 利用scroll/scrollEnd/touchEnd可以做下拉刷新，上拉加载等功能
                //     // scrollEnd -> 滚动结束时触发 VS touchEnd -> 移动端手指离开屏幕时触发
                //     scroll.on('scroll', (pos)=>{  // pos -> 记录滚动位置
                //         // console.log('scrolling...')
                //         if(pos.y > 30){
                //             this.pullDownMsg = '正在刷新'
                //         }
                //     });
                //     scroll.on('touchEnd', (pos)=>{
                //         // console.log('touchend')
                //         if(pos.y > 30){
                //             this.$axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                //                 var msg = res.data.msg;
                //                 if(msg === 'ok'){
                //                     this.moviesList = res.data.data.movieList;
                //                     this.pullDownMsg = '刷新成功';
                //                     setTimeout(() => { 
                //                         this.pullDownMsg = '';
                //                     }, 500);
                //                 }
                //             })
                //         }
                //     });
                // })
            }
        })
    },
    methods: {
        handleToDetail(movieId){
            console.log('跳转到电影'+movieId+'详情页...');
            this.$router.push('/movie/detail/1/' + movieId);  // 通过路由跳转页面
        },
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullDownMsg = '正在刷新'
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30){
                this.$axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        this.moviesList = res.data.data.movieList;
                        this.pullDownMsg = '刷新成功';
                        setTimeout(() => { 
                            this.pullDownMsg = '';
                        }, 500);
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
    .movie_body{ margin-bottom: 50px; flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body ul li.pull_down{ margin: 0; padding: 0; border: none }
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall, .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>