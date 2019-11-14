<template>
    <div class="message_box">
        <h2><i class="iconfont icon-wangdian"></i></h2>
        <p>{{ content }}</p>
        <div class="btn">
            <div class="cancel" @click="handleCancel">{{ cancel }}</div>
            <div class="okay" @click="handleOkay">{{ okay }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox'
}
</script>

<style scoped>
    .message_box{width: 180px; height: 120px; position: absolute; top: 50%; left: 50%; margin: -60px 0 0 -90px; background-color: #fff; box-shadow:0 15px 30px rgba(0,0,0,.1); border-radius: 5px; text-align: center; }
    .message_box h2{margin: 8px 0}
    .message_box h2 i.iconfont{font-size: 32px; color: #f03d37; }
    .message_box p{font-size: 18px; color: #f03d37; }
    .message_box .btn{ margin: 8px 0; display: flex; justify-content: space-around; }
    .message_box .btn div{ height: 20px; line-height: 20px; }

</style>