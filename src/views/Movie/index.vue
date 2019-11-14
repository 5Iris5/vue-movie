<template>
    <div id="main">
        <Header title="喵喵电影"/>
        <div class="movie_menu">
            <router-link tag="div" to="/movie/city" class="city_name">
                <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
            </router-link>
            <div class="hot_swtich">
                <router-link tag="div" to="/movie/playingNow" class="hot_item">正在热映</router-link>
                <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
            </div>
            <router-link tag="div" to="/movie/search" class="search_entry">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
        </div>
        <!-- 渲染二级路由 -->
        <keep-alive>
            <router-view />
        </keep-alive>
        <TabBar />
        <!-- <MessageBox /> -->
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import City from '@/components/City'
// import MessageBox from '@/components/JS/MessageBox'
import { messageBox } from '@/components/JS'   // 导入JS组件


export default {
    name: 'Movie',
    components: {
        Header,
        TabBar,
        City
        // messageBox
    },
    mounted(){
        setTimeout(() => {
            this.$axios.get('/api/getLocation').then((res)=>{
                var msg = res.data.msg;
                if(msg === 'ok'){
                    console.log(res);
                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    console.log(this.$store.state.city.id, id);
                    if(this.$store.state.city.id == id) return;
                    // 调用JS组件
                    messageBox({
                        content: nm,
                        cancel: '取消',
                        okay: '切换城市',
                        handleCancel(){  // 不做处理
                            console.log('cancel')
                        },
                        handleOkay(){  // 切换到当前定位到的城市
                            console.log('Okay');
                            // 将当前定位城市存储到本地
                            window.localStorage.setItem('curNm', nm);
                            window.localStorage.setItem('curId', id);
                            // 重新加载页面!!!
                            window.location.reload();
                        }
                    });
                }
            })   
        }, 1200);
    }
}
</script>

<style scoped>
    .movie_menu{ display: flex; justify-content:space-around; align-items:center; background:white; width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; z-index:10;}
    .movie_menu .city_name{ height:100%; line-height: 45px;}
    .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
    .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; font-weight:700;}
    .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry{ height:100%; line-height: 45px;}
    .movie_menu .search_entry.router-link-active i{ color: #ef4238;}
    .movie_menu .search_entry i{  font-size:24px; color:#666;}
</style>