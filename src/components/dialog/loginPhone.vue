<template>
    <div class="" >
        <!-- <button class="cgg-btn" v-if="!login" open-type="getUserInfo" :class="{'active': isAgree}" :disabled="!isAgree" @getuserinfo="searchLogin">开始查询(未授权)</button>
        <button class="cgg-btn" v-if="!isPhoneAccredit && login" open-type="getPhoneNumber" :class="{'active': isAgree}" :disabled="!isAgree" @getphonenumber="searchPhone">开始查询(手机授权)</button> -->
        <button class="cgg-btn" v-if="!login" open-type="getUserInfo" :class="{'active': isAgree}" :disabled="!isAgree" @getuserinfo="searchLogin">查&nbsp;&nbsp;询</button>
        <button class="cgg-btn" v-if="!isPhoneAccredit && login" open-type="getPhoneNumber" :class="{'active': isAgree}" :disabled="!isAgree" @getphonenumber="searchPhone">查&nbsp;&nbsp;询</button>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { wxAuth, wxLogin, bindPhone } from '@/http/api.js'
import { login, getSetting } from '@/utils/wechat'
import fly from '@/http/config'

export default {
    data(){
        return{
            // 是否登录了
            // login  ---->  在store中获取
            // 是否手机授权
            // isPhoneAccredit: false,  //默认授过权，不显示
        }
    },
    props: ['isAgree', 'isPhoneAccredit'],
    computed: {
        ...mapState('user', ['login', 'userInfo', 'userToken'])
    },
    methods:{
        ...mapMutations('user', [
            'setUserInfo',
            'setUserToken'
        ]),
        // 开始查询(未授权)
        // 微信登录
        searchLogin(e){
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
                        // 保存登录成功后的状态
                        this.saveLoginState(res);
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
                if (res.code == 0){
                    // 保存登录成功后的状态
                    this.saveLoginState(res);
                }else{
                    wx.showToast({ title: res.msg, icon: 'warn' })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 保存登录成功后的状态
        saveLoginState(res){
            // 改为本地缓存
            // 把userinfo存起来
            this.setUserInfo(res.data.user);
            this.setUserToken(res.data.token);
            // 配置好访问header
            fly.config.headers = {'Authorization': this.userToken}
            
            this.$emit('update:isShow', false);
            this.$emit('reLoginFun');
            wx.showToast({ title: '登录成功' })
            

            // ======== 去判断手机是否授权 ==start
            // console.log('userInfo')
            // console.log(this.userInfo)
            // console.log(this.userInfo.tel)

            // =======测试没手机号码状态==start
            // this.userInfo.tel = '';
            // =======测试没手机号码状态==end

            // 如果为空，需要手机授权
            if (this.userInfo.tel == ''){
                this.$emit('update:isPhoneAccredit', false);
            }else{
                this.$emit('update:isPhoneAccredit', true);
            }
        },
        // 开始查询(手机授权)
        searchPhone(e){
            // console.log(e.mp.detail.errMsg) 
            // console.log(e.mp.detail.iv)
            // console.log(e.mp.detail.encryptedData)
            let params = {
                encryptedData: e.mp.detail.encryptedData,
                iv: e.mp.detail.iv
            }
            if (e.mp.detail.errMsg == "getPhoneNumber:ok"){
                //用户按了允许授权按钮
                console.log('用户按了允许授权按钮')
                
                bindPhone(params).then(res=>{
                    console.log(res);
                    if (res.code == 0){
                        // 把userinfo存起来
                        this.setUserInfo(res.data.user);
                        wx.showToast({ title: '手机授权成功' })

                        // 设置手机授权
                        this.$emit('update:isPhoneAccredit', true);
                    }else{
                        wx.showToast({ title: res.msg })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            } else {
                //用户按了拒绝按钮
                console.log('用户按了拒绝按钮')
            }
        }
    },
    created () {
    }
}
</script>

<style lang="less">
// @main_color: #EE542E;
@black_color: #212121;
.cgg-btn{
    height: 38px;
    line-height: 38px;
    border-radius: 100px;
    font-size: 32rpx;
    color: #fff;
    background: @black_color;
    &[disabled]:not([type]) {
        background: #D9D9D9;
    }
    &.active{
        background-color: @black_color;
        &:active{
            // 新加上按钮按下颜色
            background: @black_color;
        }
    }
}
</style>
