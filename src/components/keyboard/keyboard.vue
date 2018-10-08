<template>
    <!-- 通用小键盘 -->
    <div class="cgg-keyboard-model" v-if="isShow">
        <!-- <div class="cgg-keyboard-bg" @click.stop="hideAnimate"></div> -->
        <div class="cgg-keyboard animated" v-if="isShow" :class="{'fade-in-up':isShowAnimate,'fade-out-down':!isShowAnimate}">

            <div class="cgg-keyboard-keyset pb30 clearfix">
                <button type="button" class="cgg-keyboard-btn" data-value="1" @click="setKey($event)">1</button>
                <button type="button" class="cgg-keyboard-btn" data-value="2" @click="setKey($event)">2</button>
                <button type="button" class="cgg-keyboard-btn" data-value="3" @click="setKey($event)">3</button>
                <button type="button" class="cgg-keyboard-btn" data-value="4" @click="setKey($event)">4</button>
                <button type="button" class="cgg-keyboard-btn" data-value="5" @click="setKey($event)">5</button>
                <button type="button" class="cgg-keyboard-btn" data-value="6" @click="setKey($event)">6</button>
                <button type="button" class="cgg-keyboard-btn" data-value="7" @click="setKey($event)">7</button>
                <button type="button" class="cgg-keyboard-btn" data-value="8" @click="setKey($event)">8</button>
                <button type="button" class="cgg-keyboard-btn" data-value="9" @click="setKey($event)">9</button>
                <button type="button" class="cgg-keyboard-btn" data-value="0" @click="setKey($event)">0</button>
                <br/>
                <button type="button" class="cgg-keyboard-btn" data-value="Q" @click="setKey($event)">Q</button>
                <button type="button" class="cgg-keyboard-btn" data-value="W" @click="setKey($event)">W</button>
                <button type="button" class="cgg-keyboard-btn" data-value="E" @click="setKey($event)">E</button>
                <button type="button" class="cgg-keyboard-btn" data-value="R" @click="setKey($event)">R</button>
                <button type="button" class="cgg-keyboard-btn" data-value="T" @click="setKey($event)">T</button>
                <button type="button" class="cgg-keyboard-btn" data-value="Y" @click="setKey($event)">Y</button>
                <button type="button" class="cgg-keyboard-btn" data-value="U" @click="setKey($event)">U</button>
                <button type="button" class="cgg-keyboard-btn" data-value="I" @click="setKey($event)">I</button>
                <button type="button" class="cgg-keyboard-btn" data-value="O" @click="setKey($event)">O</button>
                <button type="button" class="cgg-keyboard-btn" data-value="P" @click="setKey($event)">P</button>
                <br/>
                <button type="button" class="cgg-keyboard-btn left" data-value="A" @click="setKey($event)">A</button>
                <button type="button" class="cgg-keyboard-btn" data-value="S" @click="setKey($event)">S</button>
                <button type="button" class="cgg-keyboard-btn" data-value="D" @click="setKey($event)">D</button>
                <button type="button" class="cgg-keyboard-btn" data-value="F" @click="setKey($event)">F</button>
                <button type="button" class="cgg-keyboard-btn" data-value="G" @click="setKey($event)">G</button>
                <button type="button" class="cgg-keyboard-btn" data-value="H" @click="setKey($event)">H</button>
                <button type="button" class="cgg-keyboard-btn" data-value="J" @click="setKey($event)">J</button>
                <button type="button" class="cgg-keyboard-btn" data-value="K" @click="setKey($event)">K</button>
                <button type="button" class="cgg-keyboard-btn" data-value="L" @click="setKey($event)">L</button>
                <br/>
                <button type="button" class="cgg-keyboard-btn w-51 fz-0" @click="upperCase">
                    <img class="icon icon-shift" src="/static/images/keyboard-shift.png" alt="">
                </button>
                <button type="button" class="cgg-keyboard-btn" data-value="Z" @click="setKey($event)">Z</button>
                <button type="button" class="cgg-keyboard-btn" data-value="X" @click="setKey($event)">X</button>
                <button type="button" class="cgg-keyboard-btn" data-value="C" @click="setKey($event)">C</button>
                <button type="button" class="cgg-keyboard-btn" data-value="V" @click="setKey($event)">V</button>
                <button type="button" class="cgg-keyboard-btn" data-value="B" @click="setKey($event)">B</button>
                <button type="button" class="cgg-keyboard-btn" data-value="N" @click="setKey($event)">N</button>
                <button type="button" class="cgg-keyboard-btn" data-value="M" @click="setKey($event)">M</button>
                <button type="button" class="cgg-keyboard-btn w-51 fz-0" @click="delKey">
                    <img class="icon icon-del" src="/static/images/keyboard-delete.png" alt="">
                </button>
                <br/>
                <button type="button" class="cgg-keyboard-btn big-btn" @click="hideAnimate">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            key: '',
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
        close(){
            // 下面的语句配合开头写的 .sync 就会更新父组件中的 isShow 变量
            this.$emit('update:isShow', false)
        },
        // 设置键值
        setKey(event){
            this.key = event.target.dataset.value;
            this.number += this.key;

            this.$emit('returnkey', this.number);
        },
        // 大小切换
        upperCase(){

        },
        // 删除键值
        delKey(){
            let _number = this.number;
            this.number = _number.substr(0, _number.length-1);

            this.$emit('returnkey', this.number);
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

            &.left{
                margin-left: 24px;
            }
            &.w-51{
                width: 51px;
                font-size: 16px;
            }
            &.big-btn{
                width: 365px;
                font-size: 16px;
            }

            .icon{
                width: 20px;
                height: 20px;
                vertical-align: middle;
                &.icon-shift{
                    width: 20px;
                    height: 18px;  
                }
                &.icon-del{
                    width: 23px;
                    height: 17px;
                }
            }
        }
    }
}
// .weui-mask {
//     position: fixed;
//     z-index: 1000;
//     top: 0;
//     right: 0;
//     left: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.6);
// }
// .cgg-keyboard{
//     position: absolute;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 1000;
//     .bg-mask{
//         width: 100%;
//         height: 100%;
//         background: #000;
//         opacity: 0.3;
//     }
// }
// .cgg-keyboard{
//     position: absolute;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 1000;
//     .bg-mask{
//         position: absolute;
//         bottom: 0;
//         width: 100%;
//         height: 300rpx;
//         background: #000;
//         opacity: 0.3;
//     }
// }
</style>
