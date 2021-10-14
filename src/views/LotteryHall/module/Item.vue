<template>
<div class="item">
    <div class="icon icon-done" v-if="item.status==2"></div>
    <div class="icon icon-cz" v-else :class="{'icon-bet':item.lottery_id}"></div>
    <div class="text">
        <div class="top"><span>{{item.title}}</span><span><em>{{item.coin}}</em>/{{item.target_coin}}{{taskActive==1?'元':''}}</span></div>
        <div class="bot">
            <p>{{item.reward}}元</p>
            <div @click="toggleText"><span>查看详情</span><i :class="{'icon-shang':active}"></i></div>
        </div>
        <div class="result-text" ref="restext">
            <div class="pad20"></div>
            <div v-html="item.rules"></div>
        </div>
        <div class="goRoute" v-if="item.status==0&&taskActive==1" @click="goRouter">去完成</div>
        <div class="goRoute" v-if="item.status==1&&taskActive==1" @click="addTake(item.id)">领取</div>
        <div class="goRoute" v-if="item.status==2&&taskActive==1" :class="{done:item.status==2}">已领取</div>

        <div class="goRoute" v-if="item.coin<item.target_coin&&taskActive==2" @click="goRouter">去完成</div>
        <div class="goRoute" v-if="item.coin>=item.target_coin&&item.status==1&&taskActive==2" @click="addTake(item.id)">领取</div>
        <div class="goRoute" v-if="item.coin>=item.target_coin&&taskActive==2&&item.status==2" :class="{done:item.status==2}">已领取</div>
    </div>
</div>
</template>
<script>
import {Dialog} from "vant";

export default {
    data(){
        return {
            active:false,
            isAnimate:false,
            lottery:{
                '10':'ssc_cq',
                '11':'ssc_fenfen',
                '12':'ssc_sanfen',
                '20':'pk10_bj',
                '21':'pk10_jisu',
                '22':'pk10_fenfen',
                '23':'xyft'
            }
        }
    },
    props: {
        item: {
            type: String,
            default: ''
        },
        index: {
            type: String,
            default: ''
        }
    },
    methods:{
        // 格式化处理
        formatDate (date, fmt) {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            }
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + ''
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
                }
            }
            return fmt
        },
        addTake () {
            if (Number(this.money) < 1) return this.$vux.toast.text('请输入投注金额', 'middle')
            if (Number(this.amount > Number(this.coin))) return this.noMoney = true
            this.valCoin.minMoney = this.minMoney // 单注最高金额
            this.valCoin.maxMoney = this.maxMoney // 单注最高金额
            // 独立对象数据指向不同地址
            let arr = JSON.parse(JSON.stringify(this.betList))
            this.betNum += this.betsNum
            this.valCoin.Amount += this.amount
            // 保存单注金额
            arr.forEach(res => {
                res.money = this.money.toString()
                // if (res.group_name == '连码' || res.group_name == '不中' || res.group_name == '连肖' || res.group_name == '连尾') res.betNum = this.betsNum
                if (res.group_name == '连肖' || res.group_name == '连尾') res.minOdds = this.minOdds, res.minOddsId = this.minOddsId
                this.validnote.push(res)
            })
            this.isNote = true
            let betObj = { betNum: this.betNum, Amount: this.valCoin.Amount, validnote: this.validnote }
            sessionStorage.setItem('betObj', JSON.stringify(betObj))
            this.reset()
        },
        getScrollerHeight () {
            this.$nextTick(() => {
                let ballNum = 0
                if (this.$refs.ballNum && this.$refs.ballNum.length > 0) ballNum = 12
                // isBet为true代表投注false代表追号
                if (this.$refs.scroller) {
                    if (this.isBet) {
                        if (!this.betShow) {
                            this.$refs.scroller.$el.style.paddingBottom = '22.067vw'
                            if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = 13.067 + ballNum + 'vw'
                        } else {
                            this.$refs.scroller.$el.style.paddingBottom = '32.533vw'
                            if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = 32.533 + ballNum + 'vw'
                        }
                    } else {
                        this.$refs.scroller.$el.style.paddingBottom = '0'
                        if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = ballNum + 'vw'
                    }
                    this.$refs.scroller.reset()
                    if (this.$refs.scroRight) this.$refs.scroRight[0].reset()
                }
            })
        },
        sign () {
            if (!this.$cookie.get('webToken')) {
                let _this = this
                return Dialog.confirm.show({
                    title: '温馨提示',
                    content:'您还未登录，请先登录！',
                    confirmText:'确认',
                    showCancelButton:false,
                    onConfirm () {
                        _this.$router.push({path:'/login'})
                    }
                })
            }
        },
        onItemClick(index){
            this.active = index
            this.isSendingHttp = true
            this.isNoMoreData = false
            this.isNoneData = false
            this.$vux.loading.show({
                text: '加载中',
            })
            if(index == 0){
                this.getHttp(false,'follows');
            }else{
                this.getHttp(false,'fans');
            }
        },
        toggleText(){
            this.$store.commit('taskDownShowActive',this.index)
            var height = this.$refs.restext.clientHeight
            if(this.isAnimate) return;
            this.isAnimate = true;
            if(!this.active){
                this.$refs.restext.style = "height:0;"
                setTimeout(()=>{
                    this.$refs.restext.style = "position:relative;opacity:1;height:"+height+"px;"
                },20)
                setTimeout(()=>{
                    this.isAnimate = false;
                },500)
            }else{
                this.$refs.restext.style = "height:0;position:relative;opacity:0;"
                setTimeout(()=>{
                    this.$refs.restext.style = "position:absolute;opacity:0;"
                    this.isAnimate = false;
                },500)
            }
            this.active = !this.active;
        }
    },
    mounted() {
        this.onItemClick()
    },
    created() {
        this.getScrollerHeight()
    }
}
</script>
<style lang="scss" scoped>
    .item{
        overflow: hidden;
        padding-bottom:19px;
        border-bottom:#d2d2d2 1px solid;
        position: relative;
        background: #fff;
        .input-group{
            padding-left:20px;
            background: #fff;
            border-top:1px solid #d2d2d2;
            border-bottom:1px solid #d2d2d2;
            .input-wrap{
                height: 90px;
                border-bottom:1px solid #d2d2d2;
                position: relative;
                overflow: hidden;
                >div{
                    float: left;
                    height: 89px;
                    line-height: 89px;
                    font-size: 30px;
                    color: #333333;
                    width:155px;
                    text-align: left;
                    margin-right:28px;
                }
                >input{
                    height: 50px;
                    line-height: 50px;
                    float: left;
                    width:calc(100% - 183px);
                    color:#72849E;
                    font-weight: bold;
                    font-size: 30px;
                    margin-top:20px;
                }
                >input.has{
                    opacity: 0;
                }
                >span{
                    position: absolute;
                    display: block;
                    height: 89px;
                    line-height: 89px;
                    font-weight: bold;
                    width:calc(100% - 183px);
                    right:0;
                    top: 0;
                    z-index: 1;
                    font-size: 30px;
                    color: #72849E;
                }
                input::-webkit-input-placeholder{
                    font-weight: 500;
                }
                .close,.warning{
                    display: block;
                    position: absolute;
                    right:20px;
                    height: 90px;
                    width: 50px;
                }
                .close{
                    background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                    background-size: 30px 30px;
                    z-index: 2;
                }
                .warning{
                    background: url('~@/assets/image/system/wring.png') center center no-repeat;
                    background-size: 25px 25px;
                    z-index: 2;
                }
            }
            >div:last-child{
                border-bottom:none;
            }
        }
        .goRoute{
            position: absolute;
            top: 80px;
            right: 30px;
            width:140px;
            height: 60px;
            line-height: 60px;
            background: #d9342f;
            color:#fff;
            font-size: 30px;
            border-radius: 6px;
            text-align: center;
        }
        .done{
            background: #999;
        }
        .signMask {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
            .signBox {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 86%;
                margin-left: -43%;
                border-radius: 6px;
                background: white;
                color: #999;
                font-size: 28px;
                transform: translateY(-50%);
                .signTitle {
                    height: 80px;
                    line-height: 80px;
                    color: white;
                    font-size: 30px;
                    text-align: center;
                    background: #d9342f;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    .iconX {
                        position: absolute;
                        top: 27px;
                        right: 24px;
                        width: 26px;
                        height: 26px;
                        background: url("~@/assets/image/play/icon-close.png") no-repeat center;
                        background-size: cover;
                    }
                }
                .signTips {
                    margin: 30px 0 24px;
                    padding: 0 30px;
                    color: #000;
                    text-align: justify;
                    line-height: 35px;
                }
                .signList {
                    padding: 0 30px 45px;
                    li {
                        text-align: justify;
                        line-height: 35px;
                        .rd {
                            color: #d9342f;
                        }
                        em {
                            float: left;
                            height: 35px;
                            width: 6px;
                            margin-right: 20px;
                            background: #d9342f;
                        }
                    }
                }
            }
        }
        .icon{
            margin:30px;
            float: left;
            width: 100px;
            height: 100px;
        }
        .icon-cz{
            background: url('~@/assets/image/system/icon-edit1@2x.png') no-repeat;
            background-size: 100% 100%;
        }
        .icon-done{
            background: url('~@/assets/image/system/icon-edit4@2x.png') no-repeat;
            background-size: 100% 100%;
        }
        .icon-bet{
            background: url('~@/assets/image/system/icon-edit2@2x.png') no-repeat;
            background-size: 100% 100%;
        }
        .text{
            padding-top:20px;
            float: left;
            width:calc(100% - 160px);
            .top{
                line-height: 35px;
                margin-bottom:20px;
                span:first-child{
                    font-size: 30px;
                    color:#333;
                }
                span:last-child{
                    font-size: 24px;
                    float: right;
                    color:#999;
                    padding-right:50px;
                    em{
                        color:#d9342f;
                    }
                }
            }
        }
    }
</style>
