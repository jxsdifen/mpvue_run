<template>
    <div class="modal" v-if="isShowLogin">
        <div class="dialog">
            <div class="modal-content">
                <div class="modal-header border-line-bottom">微信登录</div>
                <div class="modal-body">
                    <img class="img-logo mt15" src="/static/images/logo.jpeg" alt="">
                    <div class="pl30 pr30">
                        <div class="pb10 border-line-bottom">车实况申请获得以下权限:</div>
                        <div class="modal-body-list">
                            <div class="modal-body-item"><span class="circle">·</span><span>获得你的公开信息（昵称、头像等）</span></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-line-top cgg-flex">
                    <button class="modal-btn modal-btn-default" @click.stop="cancelFun">拒绝</button>
                    <button class="modal-btn modal-btn-primary" @click.stop="confirmFun">允许</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: ['isShowLogin'],
    methods:{
        cancelFun: function(){
            this.$emit('update:isShowLogin', false);
        },
        confirmFun: function(){
            console.log('允许')
        }
    }
}
</script>

<style lang="less">
.border-line-top{
    border-top: 1rpx solid #D5D5D6;
}
.border-line-bottom{
    border-bottom: 1rpx solid #D5D5D6;
}

.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    font-size: 0;
    text-align: center;
    z-index:9999;
    .dialog{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 282px;
        border-radius: 4px;
        color: #000;
        background-color: #fff;
        font-size: 14px;
        .modal-btn {
            display: block;
            position: relative;
            flex: 1;
            height: 40px;
            line-height: 40px;
            background: rgba(0, 0, 0, 0);
            border-radius: 0;
            font-size: 16px;
            &:after {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width: 2rpx;
                bottom: 0;
                border-left: 2rpx solid #D5D5D6;
            }
            &.modal-btn-default {
                color: #353535;
            }
            &.modal-btn-primary {
                color: #0BB20C;
            }
        }
        .modal-content{
            .modal-header{
                height: 44px;
                line-height: 44px;
                font-size: 16px;
            }
            .modal-body{
                .img-logo{
                    width: 36px;
                    height: 36px;
                }
                .modal-body-list{
                    padding: 10px 0 10px;
                    font-size: 13px;
                    color: #8d8b8e;
                    text-align: left;
                    .modal-body-item{
                        line-height: 1.6;
                        span{
                            vertical-align: middle;
                            &.circle{
                                margin-right: 5px;
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
            .modal-footer{
            }
        }
    }
}
</style>
