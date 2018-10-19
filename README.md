# vue-time-axis

> 适用于Vue项目视频进度条，可以传入多段视频。
> 根据视频时间展示某个时间段下有视频，某个时间段下无视频。
> 支持拖拽时间指针到某个时间点，然后返回当前所指时间戳。
> 实时传入时间戳，可根据传入时间戳定位指针到当天时间点。（需要传入当天 0 点至时间点的秒数，比如：3600 = 一小时）

## 使用

``` bash
# 安装
npm install vue-time-axis --save

# 使用（main.js）
import VueTimeAxis from 'vue-time-axis'
Vue.use(VueTimeAxis)

# 组件内使用
<vue-time-axis
    :timeArr="playBackViedoList" // 传入视频时间用于计算显示视频存在时间段 [{endTime: 1539911782, startTime: 1539911181}]
    :playTime="timeAxisTime" // 传入当前定位时间点的时间戳 1小时 = 3600
    @exportSelTime="timeAxisSelTime" // 时间轴拖拽结束后导出方法默认导出当日0点++ 计算后的时间戳 01:00 = 3600s
    >
</vue-time-axis>
:timeArr （必传）// 接收Array
:playTime （必传）// 接收Number
:timeArr // 拖拽时间点结束后导出方法 默认导出当日 0 点累加时间戳 01:00 = 3600s
```
