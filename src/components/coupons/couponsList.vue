<template>
    <div class="couponsModal" v-if="isShow" :class="{'fade-in-Left':isShowAnimate,'fade-out-Left':!isShowAnimate}">
        <scroll-view scroll-y scroll-top="0" :style="{'height': 'calc(100vh - 50px)'}">
            <dl class="order-list mt20">
                <!-- 优惠券 start -->
                <dd v-for="(item,idx) in coupons" :key="idx" class="order-item" :class="{'user-old': !item.isUsed}">
                    <div class="price-block">
                        <img class="img-bg" :src="item.isUsed ? '/static/images/img-coupon.png':'/static/images/img-coupon-used.png'" alt="">
                        <div class="price">
                            <!-- <span>￥</span><span class="price-value">{{ item.reducePrice }}</span> -->
                            <span>￥</span><span class="price-value">{{ item.reducePrice_format }}</span>
                        </div>
                    </div>
                    <div class="content-block">
                        <div class="title fz-14">{{item.name}}</div>
                        <div class="intro fz-10">{{item.description}}</div>
                        <div class="date fz-10">{{item.validFrom}}-{{item.validTo}}</div>
                        <div @click="selectCard(item)">
                            <img class="select-icon" :src="item.isUsed ? '/static/images/icon-selected.png':'/static/images/icon-unselected.png'" alt="">
                        </div>
                    </div>
                </dd>
                <!-- 优惠券 end -->
            </dl>
        </scroll-view>

        <!-- <div class="pay-footer">
            <div class="pay-footer-con">
                <div class="pay-price">实付金额：<span class="money">￥{{ product.finalCost }}</span></div>
                <button class="pay-btn" @click="payFun">确定支付</button>
            </div>
            <div class="fix-iphonex-button" v-if="isIphoneX"></div>
        </div> -->
        <div class="search-footer">
            <button class="search-btn" @click="searchFun">选定优惠劵</button>
            <div class="fix-iphonex-button" v-if="isIphoneX"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { formatCost } from '@/utils/index'
// import { wxAuth, wxLogin } from '@/http/api.js'
// import { login, getSetting } from '@/utils/wechat'
// import fly from '@/http/config'

export default {
    data(){
        return{
            isShowAnimate: true,
            coupons: [],
        }
    },
    props: ['isShow'],
    computed: {
        ...mapState('pay', ['carInfor']),
    },
    methods:{
        // ...mapMutations('user', [
        //     'setUserInfo',
        //     'setUserToken'
        // ]),
        loadCoupons(){
            console.log('loadCoupons')
            console.log(this.carInfor)
            this.coupons = this.carInfor.coupons;
            this.coupons.map(item => { 
                item.reducePrice_format = formatCost(item.reducePrice);
            })
        }
    },
    created () {
    }
}
</script>

<style lang="less">
.couponsModal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 9999;
}

@border-color: #E3E3E3;
@font-color: #211614;
@font-color-gray: #999;
@font-color-red: #EE544D;
@bg-color-yellow: #F5D142;

.select-icon{
    position: absolute;
    top: 39px;
    right: 20px;
    width: 18px;
    height: 18px;
}
.order-list{
    .order-item{
        display: flex;
        margin: 0 15px 15px;
        width: 345px;
        height: 96px;
        .price-block{
            position: relative;
            width: 127px;
            height: 96px;
            // background-image: url("/static/images/card_yes.png");
            .img-bg{
                width: inherit;
                height: inherit;
            }
            .price{
                position: absolute;
                margin: 22px 0 0 5px;
                top: 0;
                font-size: 20px;
                font-weight: 400;
                color: @font-color;
                .price-value{
                    font-size: 32px;
                }
            }
        }
        .content-block{
            position: relative;
            padding: 10px 10px 10px 7px;
            width: 218px;
            height: 96px;
            background-color: #fff;
            box-sizing: border-box;
            .intro{
                color: @font-color-gray;
            }
            .date{
                position: absolute;
                bottom: 14px;
                color: @font-color-gray;
            }
            .order-item__btn{
                position: absolute;
                right: 10px;
                bottom: 10px;
                display: inline-block;
                padding: 0;
                width: 70px;
                height: 22px;
                line-height: 22px;
                font-size: 12px;
                border-radius: 100px;
                border: none;
                background-color: @bg-color-yellow;
                color: @font-color;
            }
            .img-label{
                position: absolute;
                top: 0;
                right: 0;
                width: 60px;
                height: 64px;
            }
        }
        &.user-old{
            .price{
                color: @font-color-gray;
            }
        }
    }
}
</style>
