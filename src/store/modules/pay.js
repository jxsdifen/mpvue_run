import { formatCost } from '@/utils/index'
const state = {
    appid: 'wxa7731436656c6ddb',    //appid
    secret: '890b22234106ab4e652b9f82d03c958b', //secret
    price: 0,
    // orderid: '',
    // orderCoupons: [],   //当前订单的优惠劵

    carInfor: {},           //查询到的车辆信息
    couponsList: [],        //当前订单的优惠劵
    selectCoupons: '',      //当前订单的选中优惠劵
    selectCouponsPrice: 0,  //当前订单的选中优惠劵价格
    selectCouponsPriceFormat: '0.00',  //当前订单的选中优惠劵价格格式化
}

const mutations = {
    // [ITEM_MOVIE_DETAIL]: (state, { data, match }) => {
    //   if (!match) {
    //     state.movieDetails.unshift(data)
    //   }
    //   state.movie = data
    // },
    // [ITEM_CLEAR_MOVIE]: (state) => {
    //   state.movie = {}
    // }

    // 赋值price
    setPrice: (state, value) => {
        state.price = value;
    },
    // 赋值orderid
    setOrderId: (state, value) => {
        state.orderid = value;
    },

    // 设置选中优惠劵id
    setSelectCoupons: (state, value) => {
        state.selectCoupons = value;
    },
    // 设置选中优惠劵价格
    setSelectCouponsPrice: (state, value) => {
        state.selectCouponsPrice = value;
        state.selectCouponsPriceFormat = formatCost(value);
    },

    // 单设置优惠劵列表
    setCouponsList: (state, value) => {
        state.couponsList = value;
    },
    // 赋值车辆信息
    setCarInfor: (state, value) => {
        if (value != null){
            state.carInfor = value;
            state.couponsList = value.coupons;
        }else{
            state.carInfor = {};
            state.couponsList = [];
        }
        // 清空之前选中的劵号
        state.selectCoupons = '';
        state.selectCouponsPrice = 0;
    },
}

const actions = {
    // async getMovie ({ state, commit }, { id }) {

    // }
    // async getMovie ({ state, commit }, { id }) {
    //   const movieDetails = state.movieDetails
    //   const matchMovies = movieDetails.find(v => v.id === id)
    //   if (matchMovies) {
    //     return commit(ITEM_MOVIE_DETAIL, {
    //       data: matchMovies,
    //       match: true
    //     })
    //   }
    //   let movie = await getMovieData(id)
    //   if (!movie) return
    //   commit(ITEM_MOVIE_DETAIL, {
    //     data: movie,
    //     match: false
    //   })
    // }
}
  
export default {
    state,
    mutations,
    actions
}