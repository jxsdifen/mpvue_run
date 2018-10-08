const state = {
    product: {},    //查询到车辆信息
}

const mutations = {
    // 赋值price
    setProduct: (state, value) => {
        state.product = value;
    },
}

export default {
    state,
    mutations
}