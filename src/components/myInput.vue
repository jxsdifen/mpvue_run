<template>
    <div class="cgg-flex">
        <div class="cgg-flex-1">
            <input type="text" class="cgg-input" placeholder="请输入车架号" disabled :data-value="carframe_Obj.carframeNo" v-model="carframe_Obj.carframeNo_show" @click="openkeyborad" @change="keyChange"/>
            <div class="cursor" v-if="cursorShow" :style="'left:'+cursorLeft+'px;'"></div>
        </div>
        <div v-if="carframe_Obj.carframeNo" class="cgg-input-close" @click="clearVin(carframe_Obj)">
            <img class="icon" src="/static/images/icon_del_1.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // isLoading: true
            cursorLeft: 0,
            cursorShow: false,
            interval: null,
        }
    },
    // props: ['list', 'item'],
    props: ['carframe_Obj'],
    methods: {
        openkeyborad(){
            this.$emit('openkeyborad');
            this.openInterval();
        },
        clearVin(carframe_Obj){
            // this.$emit('clear',carframe_Obj);

            let len = carframe_Obj.carframeNo_show.length;
            console.log(len)
            this.cursorLeft = 10 + len*9;
        },
        keyChange(e){
            console.log(123)
            // console.log(carframe_Obj.carframeNo)
        },

        openInterval(){
            this.interval = setInterval(()=>{
                let len = this.carframe_Obj.carframeNo_show.length;
                this.cursorLeft = 10 + len*8;

                this.cursorShow = !this.cursorShow;
            },500);
        },
        closeInterval(){
            clearInterval(this.interval);
        },
    },
    onLoad(){
        // this.openInterval();
    }
}
</script>

<style lang="less">
.cgg-flex-1{
    position: relative;
}
.cgg-input{
    padding: 0 20rpx;
    height: 48rpx;
    line-height: 48rpx;
}
.cursor{
    position: absolute;
    top: 4px;
    width: 1rpx;
    height: 18px;
    background: #999;
}
</style>
