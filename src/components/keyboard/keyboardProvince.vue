<template>
    <!-- 省份 -->
    <div class="cgg-keyboard-model" v-if="isShow">
        <!-- <div class="cgg-keyboard-bg" @click.stop="hideAnimate"></div> -->
        <div class="cgg-keyboard animated" v-if="isShow" :class="{'fade-in-up':isShowAnimate,'fade-out-down':!isShowAnimate}">

            <div class="cgg-keyboard-keyset pb30 clearfix">
                <button type="button" class="cgg-keyboard-btn" 
                    v-for="(item,index) in keyArr" :key="index" :data-value="item" @click="setKey($event)">{{item}}</button>

                <button type="button" class="cgg-keyboard-btn cgg-keyboard-btn-cancel" @click="hideAnimate">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            key: '',
            keyArr: [
                '京', '沪', '浙', '苏', '粤',    '鲁', '晋', '冀', '豫', '川',
                '渝', '辽', '吉', '黑', '皖',    '鄂', '湘', '赣', '闽', '陕',
                '甘', '蒙', '津', '贵', '云',    '桂', '琼', '青', '新', '藏',
                '港', '澳'],
            isShowAnimate: false,   //动画弹出
        }
    },
    props: ['isShow', 'number'],
    methods: {
        showAnimate(){
            this.isShowAnimate = true;
        },
        // 确定，关闭弹框
        hideAnimate(){
            this.isShowAnimate = false;
            setTimeout(()=>{ 
                // 下面的语句配合开头写的 .sync 就会更新父组件中的 isShow 变量
                this.$emit('update:isShow', false)
                this.$emit('closeKeyFun');
            },500)
        },
        // 确定，关闭弹框
        close(){
            // 下面的语句配合开头写的 .sync 就会更新父组件中的 isShow 变量
            this.$emit('update:isShow', false)
        },
        // 设置键值
        setKey(event){
            this.key = event.target.dataset.value;
            this.number = this.key;
            
            this.$emit('returnkeyProvince', this.number);
        }
    }
}
</script>

<style lang="less" scoped>
.cgg-keyboard-model{
    // position: fixed;
    // left: 0;
    // top: 0;
    // width: 100%;
    // height: 100%;
    z-index: 9999;
    .cgg-keyboard-bg{
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}
.cgg-keyboard{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #D0D5D9;
    z-index: 9999;

    .cgg-keyboard-keyset{
        .cgg-keyboard-btn{
            float: left;
            margin: 8px 0 0 5px;
            padding: 0;
            width: 32px;
            height: 42px;
            line-height: 42px;
            font-size: 18px;
            border-radius: 4px;
            text-align: center;
            color: #030303;
            background: #fff;
            border: none;
            box-shadow: 0px 1px 0px 0px rgba(112, 119, 129, 1);
            &:active{
                color: #030303;
                background: #707781;
            }

            &.cgg-keyboard-btn-cancel{
                float: right;
                margin-right: 5px; 
                width: 69px;
            }
        }
    }
}
</style>
