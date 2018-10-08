<template>
    <div class="loadmore">
        <div class="cgg-loading" v-if="isLoading">
            <img class="img mr5" src="/static/images/logo.jpeg" alt="">
            <span>努力加载中...</span>
        </div>
        <div class="cgg-copyright" v-if="!isLoading">
            <div class="title-line">
                <div class="text">已经到底啦</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // isLoading: true
        }
    },
    // props: ['list', 'item'],
    props: ['isLoading'],
    methods: {
        
    }
}
</script>

<style lang="less">
</style>
