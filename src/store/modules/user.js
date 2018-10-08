import { getCookie,setCookie,getCookieNever,setCookieNever } from '@/utils/cmmUtils'

const state = {
    login: false, //是否登录
    userInfo: {}, //用户信息
    userToken: '',
    // get login(){
    //     if (getCookieNever('cgg_user') && getCookie('cgg_token')){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // },
    // get userInfo(){
    //     let data = getCookieNever('cgg_user');
    //     if (data){
    //         return data;
    //     }else{
    //         return {};
    //     }
    // },
    // get userToken(){
    //     let data = getCookie('cgg_token');
    //     if (data){
    //         return data;
    //     }else{
    //         return '';
    //     }
    // },
}

const mutations = {
    // 赋值info
    setUserInfo(state, value){
        state.login = true;
        state.userInfo = value;
    },
    // 赋值token
    setUserToken(state, value){
        state.userToken = value;
    },

    // 赋值info
    // setUserInfo(state, value){
    //     state.login = true;
    //     state.userInfo = value;
    //     setCookieNever('cgg_user', value);
    // },
    // 赋值token
    // setUserToken(state, value){
    //     state.userToken = value;
    //     let expires_in = 24 * 3600; //24小时
    //     setCookie('cgg_token', value, expires_in);
    // }
}

export default {
    state,
    mutations
}