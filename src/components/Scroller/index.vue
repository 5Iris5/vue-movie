<template>
    <div class="wrapper" ref="wrapper">
        <!-- 内容分发 -->
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'; // 引入better-scroll组件

export default {
    name: 'Scroller',
    // 父子组件通信
    props: {
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper, {
            tap: true,
            probeType: 1
        });
        scroll.on('scroll', (pos)=>{
            this.handleToScroll(pos);  // 将pos回调出去 -》 给子组件使用
        })
        scroll.on('touchEnd', (pos)=>{
            this.handleToTouchEnd(pos);
        })
        this.scroll = scroll;
    },
    methods: {
        // 点击功能
        handleToTitle(y){
            this.scroll.scrollTo(0, y);
        }
    }
}
</script>

<style scoped>
    .wrapper{ height: 100%; }
</style>