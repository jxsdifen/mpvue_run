<template>
    <!-- <div class="cgg-tabbar">
      <a :href="(footerNavId===0)?navlist[0]" class="cgg-tabbar__item" :class="{'active': 0==footerNavId}">
          <span style="display: inline-block;position: relative;">
              <i class="iconfont icon-caidan05 cgg-tabbar__icon"></i>
          </span>
          <p class="cgg-tabbar__label">首页</p>
      </a>
      <a :href="navlist[1]" class="cgg-tabbar__item" :class="{'active': 1==footerNavId}">
          <span style="display: inline-block;position: relative;">
              <i class="iconfont icon-liebiaocaidan cgg-tabbar__icon"></i>
          </span>
          <p class="cgg-tabbar__label">订单</p>
      </a>
      <a :href="navlist[2]" class="cgg-tabbar__item" :class="{'active': 2==footerNavId}">
          <span style="display: inline-block;position: relative;">
              <i class="iconfont icon-ren-copy cgg-tabbar__icon"></i>
          </span>
          <p class="cgg-tabbar__label">我的</p>
      </a>
    </div> -->
    <div class="cgg-footer" v-if="false">
        <!-- <div class="cgg-copyright">
            <div class="title-line">
                <div class="text">第三方提供数据支持</div>
            </div>
        </div> -->
        <div class="cgg-tabbar">
            <!-- <img class="weui-uploader__delete" :data-index="111" @click="delImage" src="/static/images/icon_del_1.png" alt=""> -->
            <div :data-href="idx!=footerNavId ? item.url: ''" class="cgg-tabbar__item" :class="{'active': idx==footerNavId}" v-for="(item,idx) in navlist" :key="idx" @click="goTab(item.url,idx,footerNavId)">
                <span style="display: inline-block;position: relative;">
                    <i class="iconfont cgg-tabbar__icon" :class="item.icon"></i>
                    <!-- <span class="cgg-badge cgg-badge_dot" style="position: absolute;top: -2px;right: -13px;">8</span> -->
                </span>
                <p class="cgg-tabbar__label">{{item.title}}</p>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
  data () {
    return {
        navlist:[{
                title: "首页",
                url: "/pages/index/main",
                icon: "icon-caidan05"
            },{
                title: "订单",
                url: "/pages/orderList/main",
                icon: "icon-liebiaocaidan"
            },{
                title: "我的",
                url: "/pages/my/main",
                icon: "icon-ren-copy"
            }
        ]
    }
  },
  props: ["footerNavId"],
  methods:{
    goTab: function(url, idx, navid){
        let _url = idx!=navid ? url: '';
        console.log(_url)
        if (_url != ''){
            // wx.switchTab({ 
            //     url: '../my/main'
            // })
            // wx.switchTab({
            //     url: '/pages/my/main'
            // })
            wx.redirectTo({
                url: _url
            })
            // wx.reLaunch({
            //     url: _url
            // })
        }
    }
  }
}
</script>

<style lang="less" scoped>
.cgg-footer{
    .cgg-copyright{
        position: absolute; 
        left: 50%;
        bottom: 70px;
        color: #ccc;
        transform: translate(-50%, 0);
        .title-line{
            position: relative;
            width: 220px;
            border-bottom: 1rpx solid #ccc;
            .text{
                position: absolute;
                left: 50%;
                top: -6px;
                margin-left: -60px;
                width: 120px;
                line-height: 12px;
                font-size: 11px;
                background: #F5F5F5;
                text-align: center;
            }
        }
    }
    .cgg-tabbar {
        display: flex;
        position: fixed;
        z-index: 500;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.08);
        
        .cgg-tabbar__item{
            display: block;
            flex: 1;
            // padding: 5px 0 0;
            font-size: 0;
            color: #211614;
            text-align: center;
            
            .cgg-tabbar__icon{
                font-size: 24px;
                height:31px;
            }
            .cgg-tabbar__label{
                text-align: center;
                color: #211614;
                font-size: 10px;
                line-height: 1.8;
            }

            &.active{
                color: #F5D142;
            }
        }
    }
}
</style>
