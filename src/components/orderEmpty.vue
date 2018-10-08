<template>
    <div class="order-empty">
        <img class="img" src="/static/images/icon-order-active.png" alt="">
        <div class="title">您还没有相关的订单</div>
        <div class="desc">没找到订单？试试<span class="view-all" @click="orderAllFun">查看全部</span></div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: ['curIdx'],
    methods:{
        orderAllFun: function(){
            // 下面的语句配合开头写的 .sync 就会更新父组件中的 curIdx 变量
            this.$emit('update:curIdx', 0);
        }
    }
}
</script>


<style lang="less">
.order-empty{
    text-align: center;
    .img{
        margin-top: 30px;
        width: 100px;
        height: 100px;
    }
    .title{
        font-size: 16px;
        color: #3b3b3b;
    }
    .desc{
        margin-top: 5px;
        font-size: 14px;
        color: #999;
        .view-all{
            color: #6399ff;
        }
    }
}
</style>
