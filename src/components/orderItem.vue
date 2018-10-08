<template>
    <dd class="order-item radius-8">
        <div class="order-item__title pl15 pr15 fz-14">
            <span>{{ item.orderType=='maintain'? '维保记录':(item.orderType=='accident'?'出险记录':'') }}</span>
            <!-- <span>{{citem.statusTitle}}</span>
            <span class="fr" :class="{'color-gray': citem.status==4 || citem.status==5}">{{citem.statusText}}</span> -->
            <!-- <span class="fr" :class="{'color-gray': (item.payStatus=='' && item.queryStatus==5) }">
                {{ (item.payStatus==1 && item.queryStatus==1)?'待付款':'' }}
                {{ (item.payStatus=='' && item.queryStatus==2)?'查询中':'' }}
                {{ (item.payStatus=='' && item.queryStatus==3)?'已查询':'' }}
                {{ (item.payStatus=='' && item.queryStatus==5)?'已取消':'' }}
            </span> -->
            <!-- <span class="fr" :class="{'color-gray': (item.payStatus=='' && item.queryStatus==5) }">
                {{ (item.queryStatus==1)?'待付款':'' }}
                {{ (item.queryStatus==2)?'查询中':'' }}
                {{ (item.queryStatus==3)?'已查询':'' }}
                {{ (item.queryStatus==5)?'已取消':'' }}
                {{ (item.payStatus==4)?'无法查询':'' }}
            </span> -->
            <!-- {{item.queryStatus}} || {{item.payStatus}} -->
            <span v-if="item.queryStatus==1" class="span paying fr">待付款</span>
            <span v-if="item.queryStatus==2" class="span searching fr">查询中</span>
            <span v-if="item.queryStatus==3" class="span searched fr">已查询</span>
            <span v-if="item.queryStatus==5" class="span cancel fr">已取消</span>
            <span v-if="item.queryStatus==4 && item.payStatus==4" class="span cancel fr">无法查询</span>
            <span v-if="item.payStatus==5" class="span cancel fr">已退款</span>
        </div>
        <div class="order-item__con cgg-flex" @click="checkDetail(item.orderId, item.queryStatus)">
            <img class="img-label" :src="item.vehicleInfo.brandId?host + '/api/logo?brandId=' + item.vehicleInfo.brandId:null" alt="">
            <div class="cgg-flex-1">
                <!-- <div class="name fz-14">{{ item.vehicleInfo.standardName }}</div> -->
                <div class="name fz-14">{{ item.vehicleInfo.brand }}</div>
                <div class="text fz-12">VIN：{{ item.vehicleInfo.vinFormat }}</div>
                <div class="text fz-12">下单时间：{{ item.createdAtFormat }}</div>
            </div>
            <div class="order-item__price cgg-flex-column">
                <div>
                    <span class="fz-14">￥</span><span class="fz-14">{{ item.finalCostFormat }}</span>
                </div>
            </div>
        </div>
        <div class="order-item__bar" v-if="!(item.queryStatus==5) && !(item.payStatus==5) && !(item.queryStatus==4 && item.payStatus==4)">
            <button v-if="item.queryStatus==1" class="order-item__btn fr warn" :data-orderid="item.orderId" @click="pay">去支付</button>
            <button v-if="(item.queryStatus==1)||(item.queryStatus==2)" :data-orderid="item.orderId" class="order-item__btn fr" @click="cancelOrder">取消订单</button>
            <button v-if="item.queryStatus==3" class="order-item__btn fr warn" :data-orderid="item.orderId" :data-ordertype="item.orderType" @click="checkReport">查看报告</button>
        </div>
    </dd>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { orderCancel, orderDetail } from '@/http/api.js'
import { formatVin } from '@/utils/index'
import config from '@/config'

export default {
    data(){
        return{
            testImg: '/static/images/temp/002.jpg',
            host: config.host,

            detail: {},
            vehicleInfo: {}, //车辆基本信息
        }
    },
    props: ['list', 'item'],
    methods: {
        ...mapMutations('search', [
            'setProduct',
        ]),
        // 删除array中的值
        removeArray(_array, _id){
            var _obj = {};
            _array.forEach(element => {
                if (element.orderId == _id){
                    let _index = _array.indexOf(element);
                    _obj = _array[_index];
                    _array.splice(_index, 1);
                }
            });
            return _obj;
        },
        // 查看详情
        checkDetail(id, typeid){
            // if (typeid == 1){
            //     const url = '../orderConfirm/main?id='+id;
            //     wx.navigateTo({ url });
            // }else if (typeid == 5){
                
            // }else{
            //     const url = '../orderSearch/main?id='+id;
            //     wx.navigateTo({ url });
            // }
            if (typeid != 5){
                const url = '../orderSearch/main?id='+id+'&formPage=list';
                wx.navigateTo({ url });
            }
        },
        // 查看报告
        checkReport(e){
            // let id = e.target.dataset.orderid;
            // const url = '../orderSearch/main?id='+id;
            // wx.navigateTo({ url });
            const orderId = e.target.dataset.orderid;
            const orderType = e.target.dataset.ordertype;

            orderDetail({ orderId: orderId }).then(res=>{
                if (res.code == 0){
                    this.detail = res.data;
                    
                    this.vehicleInfo = this.detail.vehicleInfo;
                    // 格式化vin, finalCost
                    this.vehicleInfo.vinFormat = formatVin(this.vehicleInfo.vin);

                    // 存起来
                    this.setProduct(this.detail);
                }
            }).catch(err=>{
                console.log(err)
            })

            if ( orderType == 'maintain'){
                const url = '../orderDetailMaintain/main?id='+orderId;
                wx.navigateTo({ url });
            }else if ( orderType == 'accident'){
                const url = '../orderDetailAccident/main?id='+orderId;
                wx.navigateTo({ url });
            }
        },
        // 取消订单
        cancelOrder(e){
            // console.log(this.list)
            let that = this;
            let id = e.target.dataset.orderid;

            // let item = e.target.dataset.item;
            // console.log(item)
            wx.showModal({
                title: '车实况',
                content: '是否取消此订单？',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')

                        // 上传数据start
                        // ...
                        orderCancel({ orderId: id }).then(res => {
                            console.log(res)
                            if (res.code == 0){
                                let carditem = that.removeArray(that.list, id);
                                wx.showToast({ title: '订单取消成功' });
                            }else{
                                wx.showToast({ title: res.msg, icon: 'warn' });
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        // 上传数据end


                        // let carditem = that.removeArray(that.cardList[0].list, id);
                        // //console.log(carditem)
                        // //暂时用的
                        // carditem.status = 4;
                        // that.cardList[4].list.push(carditem);

                        // that.curIdx = 1;
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        // 去支付
        pay(e){
            let id = e.target.dataset.orderid;
            // const url = '../orderConfirm/main?id='+id;
            const url = '../orderSearch/main?id='+id+'&formPage=list';
            wx.navigateTo({ url });
        }
    },
    onLoad() {
    },
}
</script>

<style lang="less">
@border-color: #E3E3E3;
@border-color-warn: #EE542E;
@font-color: #211614;
@font-color-red: #EE544D;

@zi-color: #212121;
@sub-zi-color: #666;
// 列表item
.order-item{
    // margin-top: 10px;
    margin: 10px 12px 0 12px;
    color: @font-color;
    background-color: #fff;
    &:first-child{
        margin-top: 0;
    }
    .order-item__title{
        height: 40px;
        line-height: 40px;
        .span{
            display: inline-block;
            margin-top: 10px;
            padding: 0 10px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            border-radius: 10px;
            // 待付款
            &.paying{
                color: #EE542E;
                background: #FEEBE7;
            }
            // 查询中
            &.searching{
                color: #5EA0E6;
                background: #E8F1FF;
            }
            // 已查询
            &.searched{
                color: #32BE85;
                background: #E0F5ED;
            }
            // 已取消 / 无法查询
            &.cancel{
                color: #AAAAAA;
                background: #F5F5F5;
            }
        }
    }
    .order-item__con{
        padding: 15px 12px;
        border-top: 1rpx solid @border-color;

        .img-label{
            padding-top: 15px;
            padding-right: 10px;
            width: 30px;
            height: 30px;
        }
        .name{
            line-height: 20px;
            color: @zi-color;
        }
        .text{
            margin-top: 3px;
            line-height: 16px;
            color: @sub-zi-color; 
        }
        .order-item__price{
            line-height: 20px;
            color: @zi-color;
        }
    }
    .order-item__bar{
        padding-right: 7px;
        height: 42px;
        line-height: 42px;
        // border-top: 1rpx solid @border-color;
        .order-item__btn{
            display: inline-block;
            margin: 7px 10px 0 0;
            padding: 0;
            width: 74px;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            border-radius: 100px;
            border: 1rpx solid @border-color;
            background-color: #fff;
            color: @font-color;
            &.warn{
                border: 1rpx solid @border-color-warn;
                // color: @border-color-warn;
                color: #fff;
                background: @border-color-warn;
            }
        }
    }
}
</style>
