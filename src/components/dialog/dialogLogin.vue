<template>
    <div class="modal" v-if="isShow">
        <div class="modal-bg" @click="closeModel"></div>
        <div class="dialog animated" :class="{'fade-in-up':isShowAnimate,'fade-out-down':!isShowAnimate}">
            <div class="modal-title"><span>请先登录</span></div>
            <div class="modal-content">
                <button open-type="getUserInfo" class="modal-btn modal-btn-primary" @getuserinfo="wxlogin">
                    <span class="iconfont icon-weixin mr5 fz-30"></span>
                    <span>微信快捷登录</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { wxAuth, wxLogin } from '@/http/api.js'
import { login, getSetting } from '@/utils/wechat'
import fly from '@/http/config'
// import { getCookie,setCookie,getCookieNever,setCookieNever } from '@/utils/cmmUtils'

export default {
    data(){
        return{
            isShowAnimate: true
        }
    },
    props: ['isShow'],
    computed: {
        ...mapState('user', ['login', 'userInfo', 'userToken'])
    },
    methods:{
        ...mapMutations('user', [
            'setUserInfo',
            'setUserToken'
        ]),
        closeModel: function(){
            this.$emit('update:isShow', false);
        },
        // 微信登录
        wxlogin: function(e){
            console.log("现在执行用户信息授权")
            // console.log('detail:'+JSON.stringify(e.mp.detail))
            // console.log('rawData:'+e.mp.detail.rawData)
            // console.log("===============")
            // console.log('encryptedData:'+e.mp.detail.encryptedData)
            // console.log('iv:'+ e.mp.detail.iv)

            let code = '',
                encryptedData = e.mp.detail.encryptedData,
                iv = e.mp.detail.iv;
            
            login().then(res => {
                console.log(res)
                code = res.code;

                if (e.mp.detail.rawData){
                    //用户按了允许授权按钮
                    console.log('用户按了允许授权按钮')
                    
                    let params = {
                        encryptedData: encryptedData,
                        code: code,
                        iv: iv
                    }
                    // 微信用户授权（用户在没有授权注册时，去授权注册）过程
                    return wxAuth(params);
                } else {
                    //用户按了拒绝按钮
                    console.log('用户按了拒绝按钮')
                    this.$emit('update:isShow', false);
                }
            }).then(res => {
                console.log(res)
                if (res){
                    if (res.code == 0){
                        // 改为本地缓存
                        // 把userinfo存起来
                        this.setUserInfo(res.data.user);
                        this.setUserToken(res.data.token);
                        // 配置好访问header
                        fly.config.headers = {'Authorization':this.userToken}
                        
                        this.$emit('update:isShow', false);
                        this.$emit('reLoginFun');
                        wx.showToast({ title: '登录成功' })
                    }else if (res.code == 400){
                        // 已存在此用户
                        console.log('已存在此用户')
                        // 微信登录
                        this.wxHaveUserLogin();
                    }else{
                        wx.showToast({ title: res.msg, icon: 'warn' })
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 已经有用户的登录
        wxHaveUserLogin: function(){
            let code = '';
            login().then(res => {
                console.log(res)
                code = res.code;

                let params = {
                    code: code
                }
                // 微信登录
                return wxLogin(params);
            }).then(res => {
                console.log('已经有用户的登录')
                console.log(res)
                if (res.code == 0){
                    // 改为本地缓存
                    // 把userinfo存起来
                    this.setUserInfo(res.data.user);
                    this.setUserToken(res.data.token);
                    // 配置好访问header
                    fly.config.headers = {'Authorization': this.userToken}
                    
                    this.$emit('update:isShow', false);
                    this.$emit('reLoginFun');
                    wx.showToast({ title: '登录成功' })
                }else{
                    wx.showToast({ title: res.msg, icon: 'warn' })
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    created () {
    }
}
</script>

<style lang="less">
.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    text-align: center;
    z-index:9999;
    .modal-bg{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }

    .dialog{
        position: fixed;
        bottom: 0;
        width: 100%;
        color: #000;
        background-color: #fff;
        font-size: 14px;
        .modal-title{
            position: relative;
            width: 190px;
            height: 20px;
            margin: 0 auto;
            border-bottom: 1px solid #D5D5D6;
            span{
                position: absolute;
                padding: 0 10px;
                left: 50%;
                top: 10px;
                transform: translate(-50%, 0);
                background-color: #fff;
            }
        }
        .modal-content{
            padding: 15px;
            .modal-btn {
                margin-top: 15px;
                height: 44px;
                line-height: 44px;
                color: #fff;
                span{
                    vertical-align: middle;
                }
                &:first-child{
                    margin-top: 10px;
                }
                &.modal-btn-default {
                    background-color: #353535;
                }
                &.modal-btn-primary {
                    background-color: #0BB20C;
                }
            }
        }
    }
}
</style>
