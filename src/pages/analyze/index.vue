<template>
  <view class="mine">
    <view class="topBackground">
      <!-- 这里是状态栏 -->
      <view class="flex flex-row text-white status_bar px-4">
        <text class="expend mr-2">支出</text>
        <text class="income">收入</text>
      </view>
    </view>
    <view class="flex flex-col px-4 pt-24 relative z-20">
      <view class="rounded-3xl h-80 bg-white shadow py-4">
        <view class="h-12 flex flex-row justify-between mb-5 border-b px-4">
          <view class="w-21 h-5 z-10 border border-red-500"
            ><picker
              mode="date"
              :value="date"
              start="2021-01"
              @change="bindDateChange"
              :fields="curGran"
              class="flex flex-row"
            >
              <text class="picker">
                {{ date }}
              </text>
              <i class="font icon-arrow-right text-sm text-black inline rotate-90"></i>
            </picker>
          </view>
          <view class="flex flex-row">
            <view
              @click="changeGran('month')"
              :class="
                clsx('px-3 rounded-2xl w-10 h-8 leading-8 text-base text-center mr-4 ', {
                  'bg-main': curGran === 'month',
                  'bg-mainGray': curGran !== 'month',
                })
              "
              >月</view
            >
            <view
              @click="changeGran('year')"
              :class="
                clsx('px-3 rounded-2xl w-10 h-8 leading-8 text-base text-center mr-4 ', {
                  'bg-main!': curGran === 'year',
                  'bg-mainGray': curGran !== 'year',
                })
              "
              >年</view
            >
          </view>
        </view>
        <view>
          <qiun-title-bar title="渐变色区域图" />
          <view class="w-full h-48">
            <!-- 注意：这里的opts是uCharts的配置，eopts是ECharts的配置，不要搞混，如果不需要用在各种小程序端，是不需要传uCharts的opts的，只需要传eopts即可！！！这里加opts是为了覆盖uCharts的rose图的默认图例配置的位置 -->
            <qiun-data-charts
              type="area"
              :opts="{
                yAxis: { data: [{ min: 0 }] },
                extra: { area: { type: 'curve', addLine: true, gradient: true } },
              }"
              :chartData="chartsDataLine3"
              :echartsH5="true"
              :echartsApp="true"
            />
          </view>
        </view>
        <view class="flex flex-row justify-around px-4">
          <view>
            <view class="mb-2 text-center">总支出</view>
            <view class="text-xl text-main font-semibold text-center">￥ 1111</view>
          </view>
          <view>
            <view class="mb-2 text-center">平均支出</view>
            <view class="text-xl text-main font-semibold text-center">￥ 1111</view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <!-- <qiun-title-bar title="饼图" />
      <view class="charts-box">
        <qiun-data-charts
          type="pie"
          :chartData="chartsDataPie1"
          :echartsH5="true"
          :echartsApp="true"
        />
      </view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { clsx } from 'clsx'
import { onLoad } from '@dcloudio/uni-app'
//下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import demodata from '@/mockdata/demodata.json'
import { formatDate } from '@/utils'
const date = ref(formatDate(new Date(), 'YYYY-MM'))
const curGran = ref<string>('month')

const changeGran = (val: string) => {
  console.log(val, 'val')
  curGran.value = val
  if (val === 'year') {
    date.value = formatDate(new Date(), 'YYYY')
  } else {
    date.value = formatDate(new Date(), 'YYYY-MM')
  }
}

// 月份切换 进行查询数据
const bindDateChange = (e) => {
  date.value = e.detail.value
}

const chartsDataPie1 = ref({})
const chartsDataLine3 = ref({})
const getServerData = () => {
  //支出趋势
  let linearareadata = {
    categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
    series: [
      {
        name: '成交量A',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#1890FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#FFFFFF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: [100, 80, 95, 150, 112, 132],
      },
    ],
  }
  chartsDataLine3.value = linearareadata

  // 前十消费类型占比
  chartsDataPie1.value = JSON.parse(JSON.stringify(demodata.PieA))
}
onLoad(() => {
  getServerData()
})
</script>

<style>
.charts-box {
  width: 100%;
  height: 300px;
}
.status_bar {
  padding-top: calc(var(--status-bar-height) * 2);
  width: 100%;
}
.mine {
  position: relative;
  padding-bottom: 104px;
  background-color: rgb(246, 247, 255);
  height: 91vh;
}
.topBackground {
  /* background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, #f9a01f 100%); */
  background-color: #f9a01f;
  height: 160px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
