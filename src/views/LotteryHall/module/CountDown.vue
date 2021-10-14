<template>
    <section class="time">
        <span v-if="!isLoad && !nextPhase" ref="spans"><em v-if="timeTable.hour !== '00'">{{timeTable.hour}}:</em>{{timeTable.minute}}:{{timeTable.second}}</span>
        <span v-if="nextPhase">{{timeText}}</span>
    </section>
</template>

<script>
export default {
    name: 'count_-down',
    data () {
        return {
            timer: null, // 倒计时
            timeTable: {}, // 时间表
            isLoad: true, // 菊花图
            deviceTime: +new Date(), // 设备时间
            currentTime: +new Date() // 倒计时当期时间
        }
    },
    props: {
        serverTime: { type: [String, Number] }, // 服务器当期时间
        endTime: { type: [String, Number] }, // 开奖、封盘时间（截止时间）
        issue: { type: String }, // 当期期数
        timeText: { // 文字提示
            type: String,
            default: '获取下一期'
        },
        nextPhase: { // 显示（蒙板）
            type: Boolean,
            default: false
        },
        isLoads: { // 加载页面是否显示菊花图
            type: Boolean,
            default: true
        }
    },
    methods: {
        getServerTime () {
            clearTimeout(this.timer)
            this.timeTable = this.getRemainTime(new Date(Number(this.endTime) * 1000).getTime(), this.currentTime, this.deviceTime)
            this.timer = setTimeout(this.getServerTime, 1000)
            if (this.timeTable.total <= 1000 || this.timeTable.total <= 0) {
                clearTimeout(this.timer)
                this.$emit('time', 'stop') // 时间停止返回一个状态
            }
        },
        getRemainTime (endTime, serverTime, deviceTime) {
            const t = endTime - Date.parse(new Date()) - serverTime + deviceTime
            const second = Math.floor((t / 1000) % 60)
            const minute = Math.floor((t / 1000 / 60) % 60)
            const hour = Math.floor((t / (1000 * 60 * 60)) % 24)
            const day = Math.floor(t / (1000 * 60 * 60 * 24))
            return {
                total: t,
                day: day,
                hour: this._padZero(hour),
                minute: this._padZero(minute),
                second: this._padZero(second)
            }
        },
        _padZero (str) { // 单数时间前加0
            return ('00' + str).substr(str.toString().length)
        }
    },
    watch: {
        issue () { // 监听游戏期数
            this.currentTime = new Date(Number(this.serverTime) * 1000).getTime()
            this.deviceTime = +new Date()
            this.getServerTime()
        }
    },
    created () {
        if (this.serverTime) {
            this.currentTime = new Date(Number(this.serverTime) * 1000).getTime()
            this.getServerTime()
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                this.isLoad = !this.isLoad
            }, 1000)
        })
    },
    destroyed () {
        clearTimeout(this.timer)
    }
}
</script>

<style scoped>
    span {
        padding: 3px 12px;
        border: solid 1px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        position: relative;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.08);
    }
    span::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%; height: 100%; border-radius: 5px; box-shadow: inset 0 0 8px -2px rgba(255, 255, 255, .5);
    }
    span em {
        font-weight: 700;
    }
</style>
