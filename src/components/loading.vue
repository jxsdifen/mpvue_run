<template>
    <div class="loading">
        <div class="loading-main">
            <img class="icon" src="/static/images/loading.gif" alt="">
            <div class="text">努力加载中...</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods: {
        
    }
}
</script>

<style lang="less">
.loading{
    .loading-main{
        margin-top: 100px;
        text-align: center;
        .icon{
            width: 30px;
            height: 30px;
        }
        .text{
            font-size: 14px;
        }
    }
}
</style>
