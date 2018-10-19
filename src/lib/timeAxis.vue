<template>
    <div class="time-axis-content">
        <div class="marking-line-box">
            <div class="marking-line" ref="markingLine">
                <div class="marking-line-con" :key="'aa' + i" v-for="i in 24" :title="`${i - 1}:00-${i}:00`">
                    <span>{{i}}:00</span>
                </div>
                <div class="time-axis-progress-bar">
                    <div v-for="item in timeAxisArr" :key="item.endTime" :style="`flex: 0 0 ${item.percentage}%; ${item.isDisabled ? 'background-color: #2b85e4' : ''}`"></div>
                </div>
            </div>
        </div>
        <!--三角-->
        <div class="triangle-down" ref="triangleDown" @mousedown="triangleMove">
            <i></i>
        </div>
        <p style="color: #ffffff; text-align: left">{{lengthTime}}</p>
    </div>
</template>

<script>
export default {
    name: 'vue-time-axis',
    data() {
        return {
            timeAxisArr: [], // 时间标记数组
            currentTime: 0, // 当天零点
            time: 0, // 展示总时间
            currentPlayState: true // 监听父组件时间传值
        }
    },
    methods: {
        // 计算占用面积
        calculationProgressBar () {
            var arr = this.timeArr
            let num = 0
            for (let i in arr) {
                if (i === '0') {
                    num = Number(arr[i].startTime) - this.currentTime
                    this.timeAxisArr.push({isDisabled: false, percentage: num / 864, id: 'id' + Number(i)})
                    num = Number(arr[i].endTime) - Number(arr[i].startTime)
                    this.timeAxisArr.push({isDisabled: true, percentage: num / 864, id: 'id' + Number(i)})
                } else {
                    num = Number(arr[i].startTime) - Number(arr[Number(i) - 1].endTime)
                    this.timeAxisArr.push({isDisabled: false, percentage: num / 864, id: 'id' + Number(i)})
                    num = Number(arr[i].endTime) - Number(arr[i].startTime)
                    this.timeAxisArr.push({isDisabled: true, percentage: num / 864, id: 'id' + Number(i)})
                    if (Number(i) === arr.length - 1) {
                        num = 1539792000 - Number(arr[i].endTime)
                        this.timeAxisArr.push({isDisabled: false, percentage: num / 864, id: 'id' + 10000})
                    }
                }
            }
        },
        // 拖拽
        triangleMove (e) {
            var num = 0
            let odiv = this.$refs.triangleDown // 获取目标元素
            // 算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft
            document.onmousemove = (e) => { // 鼠标按下并移动的事件
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX
                num = Number(this.$refs.markingLine.offsetWidth)
                // 移动当前元素
                if (left <= num && left >= -10) {
                    odiv.style.left = left + 'px'
                }
                this.time = ((odiv.offsetLeft + 10) / (num / 100)) * 864
                this.currentPlayState = false // 关闭时间监听
            }
            document.onmouseup = (e) => {
                num = Number(this.$refs.markingLine.offsetWidth)
                this.time = ((odiv.offsetLeft + 10) / (num / 100)) * 864
                this.$emit('exportSelTime', this.time)
                this.currentPlayState = true // 打开监听时间变化
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    },
    computed: {
      lengthTime: function () {
          // 时长
          let time = Number(this.time) * 1000
          let timeDate = new Date(time - 28800000)
          return (timeDate.getHours() < 9 ? '0' : '') + timeDate.getHours() + ':' + (timeDate.getMinutes() < 9 ? '0' : '') + timeDate.getMinutes() + ':' + (timeDate.getSeconds() < 9 ? '0' : '') + timeDate.getSeconds()
      }
    },
    watch: {
        'playTime': function (oldVal) {
            let That = this
            if (this.currentPlayState) {
                let num = Number(That.$refs.markingLine.offsetWidth)
                let odiv = That.$refs.triangleDown // 获取目标元素
                let playTime = oldVal
                That.time = playTime
                odiv.style.left = (((num / 86400) * playTime) - 10) + 'px'
            }
        }
    },
    mounted () {
        var timeDate = new Date()
        timeDate.setHours(0)
        timeDate.setMinutes(0)
        timeDate.setSeconds(0)
        this.currentTime = parseInt(timeDate.getTime() / 1000)
        this.calculationProgressBar()
    },
    props: {
        timeArr: {
            required: true,
            type: Array
        },
        playTime: {
            required: true,
            type: Number
        }
    }
}
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .time-axis-content {
        user-select:none;
        height: 50px;
        width: 100%;
        background-color: #000000;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        margin-top: 10px;
    }
    .time-axis-content .triangle-down {
        width: 0;
        height: 0;
        top: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-top: 18px solid red;
        left: 0px;
        position: absolute;
        z-index: 999999;
    }
    .time-axis-content .triangle-down i {
        width: 1px;
        height: 36px;
        background-color: red;
        position: absolute;
        top: -10px;
        left: 0;
    }
    .time-axis-content .marking-line-box {
        width: 100%;
        height: 50px;
        position: absolute;
    }
    .time-axis-content .marking-line-box .time-axis-progress-bar {
        width: 100%;
        position: absolute;
        height: 10px;
        background-color: #cccccc;
        bottom: 0;
        left: 0;
        display: flex;
    }
    .time-axis-content .marking-line-box .marking-line {
        position: absolute;
        width: 100%;
        height: 50px;
        bottom: 0;
        overflow: hidden;
        left: 0;
        z-index: 10000;
        display: flex;
        justify-content: space-between;

    }
    .time-axis-content .marking-line-box .marking-line .marking-line-con {
        flex: 1 1 100%;
        height: 30px;
        display: inline-block;
        position: relative;
        border-right: 1px solid #cccccc;
        box-sizing: border-box;
        margin-top: 20px;
    }
    .time-axis-content .marking-line-box .marking-line .marking-line-con span {
        position: absolute;
        top: -15px;
        right: -16px;
        color: #ffffff;
    }
</style>
