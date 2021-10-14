<template>
    <div class="main">
        <div class="other-header">
            <i class="back" @click="$router.push({path:'/manage'})"></i>
            <div class="title"><span>银行卡</span></div>
        </div>
        <div class="content mohu" ref="content">
            <div class="banktop" v-if="banklist.length!=0">
                <div class="animate-wrap">
                    <div class="bankcard">
                        <h1>中国银行</h1>
                        <h2><span>{{tihuanFirst(banklist[0].bank_account)}}</span><i></i><span>****</span><i></i><span>****</span><i></i><span>****</span><i></i>{{tihuanLast(banklist[0].bank_account)}}</h2>
                        <p>限额：单笔最低100元，最高100000000元</p>
                    </div>
                </div>
                <div class="text">
                    <p>温馨提示</p>
                    <p>1.一个账户只能绑定一张银行卡</p>
                    <p>2.绑定后可以使用银行卡提现</p>
                    <p>3.如需更改绑定卡信息，请联系客服</p>
                </div>
            </div>

            <div v-if="banklist.length!=0" @click="$router.push({path:'/withdraw'})" class="tx-btn">我要提现</div>

            <div class="unbank" v-if="banklist.length==0"><img src="@/assets/image/system/yinlian@2x.png"></div>
            <div class="text1"v-if="banklist.length==0">
                <p>添加银行卡</p>
                <p>即可享受安全快捷的资金提现</p>
            </div>
            <div class="addbankcard" v-if="banklist.length==0" @click="$router.push({path:'/band-bankcard'})"><span class="icon-add"></span><span>添加银行卡</span></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            banklist:[]
        }
    },
    created(){
        this.getBanklist();
    },
    methods:{
        getBanklist(){
            var that = this
            that.$get('bankcard',{}).then(res=>{
                if(res.code==0 && that.$refs.content){
                    that.$refs.content.className = 'content'
                    that.banklist = res.data
                    // console.log(that.banklist)
                }
            })
        },
        tihuanFirst(str){
            return str.split('*')[0]
        },
        tihuanLast(str){
            return str.split('*')[str.split('*').length-1]
        }
    }
}
</script>

<style scoped lang="scss">
    .main{
        height: 100%;
    }
    .hide{
        display: none;
    }
    .mohu{
        filter: blur(20px);
    }
    .content-mask{
        position: absolute;
        top: 29px;
        left: 0;
        width:100%;
        height: 100%;
        z-index: 1;
    }
    .content{
        height: calc(100% - 88px);
        position: relative;
        background: #f7f7f7;
        .tx-btn{
            text-align: center;
            width:650px;
            height: 100px;
            line-height: 100px;
            font-size: 34px;
            color: #FFFFFF;
            background: $theme-color;
            border-radius: 6px;
            margin: 60px auto 0 auto;
        }
        .animate-wrap{
            width:100%;
            height: 405px;
            overflow: hidden;
            @keyframes mymove
            {
                0% {transform:translateY(-364px);}
                100% {transform:translateY(0px);}
            }
            .bankcard{
                width:670px;
                height: 364px;
                margin: auto;
                border-radius: 25px;
                overflow: hidden;
                background: url('~@/assets/image/system/card_@2x.png') no-repeat;
                background-size: 100% 100%;
                box-shadow: 0px 8px 20px #f87b7f;
                animation:mymove ease .5s forwards;
                h1,h2{
                    margin-top:50px;
                    margin-left:30px;
                    font-size: 38px;
                    color: #FFFFFF;
                    line-height: 38px;
                }
                h2{
                    margin-top:40px;
                    height: 38px;
                    overflow: hidden;
                    i{
                        display: inline-block;
                        width:17px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        margin-top:4px;
                    }
                }
                p{
                    font-size: 26px;
                    color: #FFFFFF;
                    margin-top:148px;
                    margin-left:30px;
                }
            }
        }
        .text{
            padding:25px 0 29px 20px;
            p{
                font-size: 24px;
                color: #666666;
                line-height: 33px;
                margin-bottom:8px;
            }
            p:last-child{
                margin-bottom:0px;
            }
        }
        .unbank{
            padding-top:225px;
            width:220px;
            height: 137px;
            margin: auto;
            img{
                width:220px;
                height: 137px;
            }
        }
        .text1{
            margin-bottom:59px;
            margin-top:225px;
            p:first-child{
                font-size: 30px;
                color: #666666;
                line-height: 42px;
                margin-bottom:6px;
                margin-top:50px;
                text-align: center;
            }
            p:last-child{
                font-size: 30px;
                color: #666666;
                line-height: 42px;
                text-align: center;
            }
        }
        .addbankcard{
            height: 110px;
            line-height: 110px;
            border-top:1px #D2D2D2 dashed;
            border-bottom:1px #D2D2D2 dashed;
            text-align: center;
            position: relative;
            span:first-child{
                display: block;
                width:25px;
                height: 40px;
                position: absolute;
                top: 35px;
                left: 261px;
            }
            span:first-child::before{
                content:'';
                display: block;
                position: absolute;
                top:50%;
                left: 50%;
                margin-top:-2px;
                margin-left:-12px;
                width:24px;
                height: 4px;
                background: #3F8FEB;
            }
            span:first-child::after{
                content:'';
                display: block;
                position: absolute;
                top:50%;
                left: 50%;
                margin-top:-12px;
                margin-left:-2px;
                height:24px;
                width: 4px;
                background: #3F8FEB;
            }
            span:last-child{
                display: block;
                text-align: center;
                line-height: 110px;
                font-size: 34px;
                color: #3F8FEB;
            }
        }
    }
</style>