<template>
    <div class="camera-main" v-if="isShowCamera">
        <div class="camera-body" style="width: 100%; height: calc(100vh - 200px);">
            <!-- 相机 start -->
            <camera class="camera-con" v-if="isOpenCamera" device-position="back" flash="off" binderror="error" style="width: 100%; height: 100%">
                <cover-view class="camera-box">
                    <cover-view class="close-btn" @click="closeCamera">
                        <cover-image class="close-img" src="/static/images/icon-close.png"></cover-image>
                    </cover-view>
                    <cover-view class="camera-box-frame"></cover-view>
                    <cover-view class="camera-box-tip">请将行驶证正面放于框内拍摄</cover-view>
                </cover-view>
            </camera>
            <!-- 相机 end -->
            <div class="photo" v-if="isShowPhoto">
                <img class="photo-img" :src="imgBase64" alt="">
                <div class="angle angle-tl"></div>
                <div class="angle angle-tr"></div>
                <div class="angle angle-bl"></div>
                <div class="angle angle-br"></div>
            </div>
        </div>
        <div class="camera-footer">
            <button class="camera-btn" :disabled='isTakePhotoBtn' @click="takePhoto">拍摄</button>
            <img @click="takePic" class="camera-pic" src="/static/images/icon-photo1.png" alt="">
            <!-- <img class="camera-light" src="/static/images/icon-light.png" alt=""> -->
        </div>
        <!-- 测试提示内容 -->
        <!-- <div class="photo1" v-if="isShowPhoto">
            <textarea style="color:#fff;position: absolute;top:0;" name="" id="" cols="30" rows="10" :value="result"></textarea>
        </div> -->
        <!-- 拍完照后存放canvas -->
        <canvas canvas-id="myCanvas" style="width: 100%; height: calc(100vh - 200px);"/>

        <!-- 弹框 -->
        <div class="camera-dialog" v-if="isShowDialog">
            <div class="camera-dialog-box">
                <div class="title">点击关闭行驶证将无法识别</div>
                <div class="tip">确定要关闭吗？</div>
                <div class="btnlist">
                    <button class="btn btn-close" @click="dialogClose">确定关闭</button>
                    <button class="btn btn-go" @click="dialogGo">继续拍摄</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import upng from 'upng-js'
import { getCookie,setCookie,delCookie } from '@/utils/cmmUtils'
import { baiduToken,baiduLicense } from '@/http/api.js'

export default {
    data(){
        return{
            ctx: {},
            
            isTakePhotoBtn: false, //是否能拍摄按钮

            isShowPhoto: false, //是否显示拍摄后的图片显示
            imgSrc: '',
            // imgCut: '',
            imgBase64: '',
            upimgBase64: '',    //上传bast64的图片

            // result: '提示内容',
            vin: '',    //返回上级的 车架号vin

            isShowDialog: false,    //是否无法识别弹框
        }
    },
    props: ['source', 'isShowCamera', 'isOpenCamera'],
    methods: {
        // 用照片上传
        takePic: function(){
            const ctx = wx.createCanvasContext('myCanvas')
            const platform = wx.getSystemInfoSync().platform;
            const imgWidth = 468, imgHeight = 317;
            wx.chooseImage({
                success: res => {
                //生成的图片临时路径画成canvas
                    ctx.drawImage(res.tempFilePaths[0], 0, 0, imgWidth, imgHeight)
                    ctx.draw(false, () => {
                    wx.canvasGetImageData({
                        canvasId: 'myCanvas',
                        x: 0,
                        y: 0,
                        width: imgWidth,
                        height: imgHeight,
                        success: res => {
                            if (platform === 'ios') {
                                // 兼容处理：ios获取的图片上下颠倒 
                                res = this.reverseImgData(res)
                            } 

                            wx.showLoading({
                                title: '生成中',
                            })
                            
                            // 3. png编码
                            let pngData = upng.encode([res.data.buffer], res.width, res.height)
                            // 4. base64编码
                            let base64 = wx.arrayBufferToBase64(pngData)
                            // console.log('data:image/jpeg;base64,' + base64)
                            // this.setData({
                            //     b64: 'data:image/jpeg;base64,' + base64
                            // });
                            this.$set(this.$data, 'b64', 'data:image/jpeg;base64,' + base64);

                            // base64 = encodeURI(base64);
                            this.$set(this.$data, 'upimgBase64', base64);

                            // 上传行驶证
                            this.uploadCar();
                        },
                        fail(res) {
                            console.log(res)
                        },
                    })
                    })
                }
            })
        },
        // 用拍照上传
        takePhoto: function(){
            console.log('开始拍照')
            let that = this;
            // 禁止能拍摄按钮
            this.isTakePhotoBtn = true;
            
            wx.showLoading({
                title: '生成中',
            })
            that.ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    // this.imgSrc = res.tempImagePath;
                    // this.camera = false;
                    this.$set(this.$data, 'imgSrc', res.tempImagePath);
                    this.$set(this.$data, 'camera', false);

                    console.log(this.imgSrc)
                    wx.showLoading({
                        title: '拍照成功',
                    })
                    // 关闭摄像头
                    this.$emit('update:isOpenCamera', false);

                    this.isShowPhoto = true;

                    // 截取图片(行驶证)
                    this.getRect();
                }
            })
        },
        // 截取图片
        getRect: function () {
            let that = this;
            let _w = wx.getSystemInfoSync().windowWidth;
            let _h = wx.getSystemInfoSync().windowHeight-200;
            let _ow = 375, ow = 330, oh = 220, ox = 22.5, oy = 100;
            let ratio = (_w / _ow).toFixed(2);
            let nw = Math.round(ow * ratio),
                nh = Math.round(oh * ratio),
                nx = Math.round(ox * ratio),
                ny = Math.round(oy * ratio);
            // console.log("ratio="+ratio)
            // console.log("nw="+nw)
            // console.log("nh="+nh)
            // console.log("nx="+nx)
            // console.log("ny="+ny)

            const platform = wx.getSystemInfoSync().platform;
            const ctx = wx.createCanvasContext('myCanvas');
            ctx.drawImage(that.imgSrc,0,0,_w,_h);
            ctx.draw(false, () => {
                // 2. 获取图像数据
                wx.canvasGetImageData({
                    canvasId: 'myCanvas',
                    x: nx,
                    y: ny,
                    width: nw,
                    height: nh,
                    success: res =>  {
                        // console.log('开始转成base64');
                        if (platform === 'ios') {
                            // 兼容处理：ios获取的图片上下颠倒 
                            res = this.reverseImgData(res);
                        }

                        // // 3. png编码
                        let pngData = upng.encode([res.data.buffer], res.width, res.height)
                        // // 4. base64编码
                        let base64 = wx.arrayBufferToBase64(pngData);
                        // // that.imgBase64 = 'data:image/jpeg;base64,' + base64;
                        this.$set(this.$data, 'imgBase64', 'data:image/jpeg;base64,' + base64);
                        
                        // base64进行URL编码
                        // console.log('encodeURI==='+ that.upimgBase64)
                        this.upimgBase64 = encodeURI(base64);

                        wx.showLoading({
                            title: '上传识别中',
                        })

                        // 上传行驶证
                        this.uploadCar();
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                })
            })
        },
        //ios图片处理 
        reverseImgData(res) {
            var w = res.width
            var h = res.height
            let con = 0
            for (var i = 0; i < h / 2; i++) {
            for (var j = 0; j < w * 4; j++) {
                con = res.data[i * w * 4 + j]
                res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
                res.data[(h - i - 1) * w * 4 + j] = con
            }
            }
            return res
        },
        //上传行驶证
        uploadCar: function(){
            this.getCarToken();
        },
        getCarToken: function(){
            let that = this;
            let isHaveToken = getCookie('baidu_token');
            if (isHaveToken){
                // console.log('存在token')
                let access_token = isHaveToken;
                // console.log('access_token='+access_token);
                // that.result = 'access_token='+access_token;

                // 获取行驶证信息
                that.getCarInfo(access_token);
            }else{
                // console.log('不存在token');
                let params = {
                    grant_type: 'client_credentials',
                    client_id: 'aa2tC3gKPEahHyMXf0zfFdFa',
                    client_secret: 'Y3tTXBvlPjbAY16GOQFdhe9GK0Drvatz'
                }
                // get百度token
                baiduToken(params).then(res=>{
                    let access_token = res.access_token;
                    let expires_in = res.expires_in;
                    setCookie('baidu_token', access_token, expires_in);
                    // console.log('access_token='+res.access_token)

                    // 获取行驶证信息
                    that.getCarInfo(access_token);
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 获取行驶证信息
        getCarInfo: function (access_token){
            let that = this;
            let params = {
                image: that.upimgBase64
            }
            // post百度行驶证识别
            baiduLicense(params, access_token).then(res=>{
                // console.log(res)
                let errorCode = res.error_code || '';
                if (!errorCode){    //识别成功
                    // 住址:{words: "广东省广州市天河区黄辅天道西365号自编人T803房仅限办公用途"}
                    // 使用性质:{words: "非营运"}
                    // 发动机号码:{words: "13072214395306PS"}
                    // 发证日期:{words: ""}
                    // 号牌号码:{words: "粤AH651T"}
                    // 品牌型号:{words: "揽胜运动SALWA2VF"}
                    // 所有人:{words: "广州华迪计算机工程有限公司"}
                    // 注册日期:{words: "20131101"}
                    // 车辆类型:{words: "小型越野客车"}
                    // 车辆识别代号:{words: "SALWA2VF0EA307906"}

                    // 住址/使用性质/发动机号码/发证日期/号牌号码/品牌型号/所有人/注册日期/车辆类型/车辆识别代号
                    that.vin = res.words_result['车辆识别代号'].words;
                    that.motor_no = res.words_result['发动机号码'].words;
                    that.car_no = res.words_result['号牌号码'].words;

                    wx.showToast({
                        title: '识别成功！'
                    })
                    // 关闭当前拍摄弹框
                    that.$emit('closeCameraFun', that.source, that.vin, that.motor_no, that.car_no);
                    that.closeCamera();
                }else{
                    wx.showToast({
                        title: '无法识别！'
                    })
                    // 弹出无法识别弹框
                    that.isShowDialog = true;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 关闭当前
        closeCamera: function (){
            // 清空图片框中的图片
            this.imgBase64 = '';
            // 禁止能拍摄按钮
            this.isTakePhotoBtn = false;
            // 弹出无法识别弹框
            this.isShowDialog = false;
            
            this.$emit('update:isShowCamera', false);
            // 关闭相机            
            this.$emit('closeCamera');
        },
        // ==弹框事件==
        dialogClose: function(){
            this.closeCamera();
        },
        dialogGo: function(){
            // 清空图片框中的图片
            this.imgBase64 = '';
            // 禁止能拍摄按钮
            this.isTakePhotoBtn = false;
            // 弹出无法识别弹框
            this.isShowDialog = false;
            
            this.$emit('update:isOpenCamera', true);
            this.isShowPhoto = false;            
        }
    },
    onLoad: function(){
        this.ctx = wx.createCameraContext()//创建摄像头对象
    }
}
</script>

<style lang="less" scoped>
@bg-color-yellow: #F5D142;
@bg-color-gray: #D9D9D9;

@font-color: #211614;
@font-color-gray: #999;
@font-color-white: #fff;

.photo1{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: #000;
    z-index: 99;
    color: #fff;
}
.photo{
    position: absolute;
    left: 22.5px;
    top: 100px;
    line-height: 0;
    .photo-img{
        width: 330px;
        height: 220px;
        border: 1px solid #fff;
    }
    .angle{
        position: absolute;
        width: 20px;
        height: 20px;
        &.angle-tl{
            top: -1px;
            left: -1px;
            border-top: 3px solid #fff;
            border-left: 3px solid #fff;
        }
        &.angle-tr{
            top: -1px;
            right: -1px;
            border-top: 3px solid #fff;
            border-right: 3px solid #fff;
        }
        &.angle-bl{
            bottom: -1px;
            left: -1px;
            border-bottom: 3px solid #fff;
            border-left: 3px solid #fff;
        }
        &.angle-br{
            bottom: -1px;
            right: -1px;
            border-bottom: 3px solid #fff;
            border-right: 3px solid #fff;
        }
    }
}

.camera-main{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%;
    background-color: #000;
    z-index:9999;
    .camera-body{
        background-color: rgba(255, 255, 255, 0.8);
        .camera-con{
            z-index: 9;

            .camera-box{
                position: absolute;
                position: fixed;
                top: 0;
                z-index: 99;
                
                .close-btn{
                    position: fixed;
                    top: 30px;
                    left: 10px;
                    width: 38px;
                    height: 38px;
                    .close-img{
                        margin: 11px;
                        width: 16px;
                        height: 16px;
                    }
                }
                .camera-box-frame{
                    margin: 100px 22px 0;
                    width: 330px;
                    height: 220px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 1);
                }
                .camera-box-tip{
                    margin: 19px auto 0;
                    width: 190px;
                    height: 24px;
                    line-height: 24px;
                    opacity: 0.5;
                    border-radius: 12px;
                    background-color: rgba(0, 0, 0, 1);
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                }
            }
        }
    }

    .camera-footer{
        position: relative;
        width: 100%;
        height: 200px;
        background-color: #000;
        .camera-btn{
            position: absolute;
            left: 158px;
            top: 70px;
            padding: 0;
            width: 60px;
            height: 60px;
            line-height: 54px;
            background: none;
            border: 3px solid #fff;
            border-radius: 30px;
            font-weight: 100;
            color: #fff;
        }
        .camera-pic{
            position: absolute;
            left: 30px;
            top: 88px;
            width: 24px;
            height: 24px;
        }
        .camera-light{
            position: absolute;
            right: 32px;
            top: 88px;
            width: 24px;
            height: 24px;
        }
    }
}

// 弹框
.camera-dialog{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .camera-dialog-box{
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -75px 0 0 -140px;
        width: 280px;
        height: 150px;
        border-radius: 4px;
        background-color: @font-color-white;
        .title{
            margin: 25px 0 0 0;
            height: 22px;
            line-height: 22px;
            color: @font-color;
            font-size: 16px;
            text-align: center;
        }
        .tip{
            margin: 5px 0 0 0;
            height: 17px;
            line-height: 17px;
            color: @font-color-gray;
            font-size: 12px;
            text-align: center;
        }
        .btnlist{
            margin: 20px 0 0 0;
            .btn{
                display: inline-block;
                width: 115px;
                height: 36px;
                line-height: 36px;
                border-radius: 100px;
                background-color: red;
                font-size: 14px;
                font-weight: 200;
                &.btn-close{
                    float: left;
                    margin-left: 20px;
                    color: @font-color-white;
                    background-color: @bg-color-gray;
                }
                &.btn-go{
                    float: right;
                    margin-right: 20px;
                    color: @font-color;
                    background-color: @bg-color-yellow;
                }
            }
        }
    }
}
</style>
