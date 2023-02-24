<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading"></Loading>
            <Scroller v-else ref="city_list">   <!-- 内部只能有一个根节点 -->
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm, item.id)">{{ item.nm }}</li>
                            <!-- <li>北京</li>
                            <li>上海</li>
                            <li>北京</li>
                            <li>上海</li>
                            <li>北京</li>
                            <li>上海</li>
                            <li>北京</li> -->
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <!-- <div>
                            <h2>A</h2>
                            <ul>
                                <li>阿拉善盟</li>
                                <li>鞍山</li>
                                <li>安庆</li>
                                <li>安阳</li>
                            </ul>
                        </div> -->
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm, itemList.id)">{{ itemList.nm }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in cityList" :key="item.index" @click="handleToIndex(index)">{{ item.index }}</li>
                <!-- <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'City',
    data(){
        return {
            hotList: [],
            cityList: [],
            isLoading: true
        }
    },
    mounted(){
        var hotlist = window.localStorage.getItem('hotlist');
        var citylist = window.localStorage.getItem('citylist');
        if(hotlist && citylist){
            this.isLoading = false;
            this.hotList = JSON.parse(hotlist);
            this.cityList = JSON.parse(citylist);
            return
        }
        this.$axios.get('/api/cityList').then((res) => {
            var msg = res.data.msg;
            if(msg === 'ok'){
                console.log(res);
                this.isLoading = false;
                var cities = res.data.data.cities;
                var {hotList, cityList} = this.formatCityList(cities);
                this.hotList = hotList;
                this.cityList = cityList;
                // 将城市名称缓存到浏览器 localStorage只能存储字符串类型的数据
                window.localStorage.setItem('hotlist', JSON.stringify(hotList));
                window.localStorage.setItem('citylist', JSON.stringify(cityList));
            }
        })  
    },
    methods: {  // 1)根据城市的首字母进行排序 2)滑动到对应位置 scrollTop VS offsetTop
        formatCityList(cities){
            var hotList = [];
            var cityList = [];

            for(var i = 0; i < cities.length; i++){
                if(cities[i].isHot === 1){
                    hotList.push(cities[i]); // 页面渲染时，方便key绑值
                    // hotList.push(cities[i].nm); -> 只有热门城市
                }
            }
            console.log(hotList);

            for(var i = 0; i < cities.length; i++){
                var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                // 模拟cityList内部数组的数据结构
                // {index: 'A', list: [{nm: '长沙', id: 001}]}
                // console.log(toCom(firstLetter))
                if(toCom(firstLetter)){  // 新添加索引
                    cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                }
                else{  // 累加到已有索引
                    for(var j = 0; j < cityList.length; j++){
                        cityList[j].list.push({nm: cities[i].nm, id: cities[i].id})
                    }
                }
            }
            console.log(cityList)

            cityList.sort((n1, n2) => {
                if(n1.index > n2.index){
                    return 1;
                }
                else if(n1.index < n2.index){
                    return -1;
                }
                else{
                    return 0;
                }
            })

            function toCom(firstLetter){
                for(var i = 0; i < cityList.length; i++){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }

            return { // 把需要用到的值（获取完毕）映射出去
                hotList,
                cityList
            }
        },
        // 点击右侧索引跳转到对应位置
        handleToIndex(index){
            // console.log(this.$refs.city_sort);
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // console.log(this.$refs.city_sort, this.$refs.city_sort.parentNode);
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_list.handleToTitle(-h2[index].offsetTop);
        },
        // 点击城市名修改当前选择城市
        handleToCity(nm, id){
            console.log(nm, id);
            // 在子组件中提交mutations修改初始state
            this.$store.commit('city/CITY_INFO', {nm, id});
            // 防止刷新会城市回到初始值
            window.localStorage.setItem('curNm', nm);
            window.localStorage.setItem('curId', id);
            // 跳到正在热映页面
            this.$router.push('/movie/playingNow');
        }
    }
}
</script>

<style scoped>
    .city_body{margin-bottom: 50px; margin-top: 97px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{ background-color:transparent; width:0; }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ font-size: 12px; width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>