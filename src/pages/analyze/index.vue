<template>
  <view class="mine">
    <view class="topBackground"> </view>
    <view class="flex flex-col pt-5 relative z-20">
      <view class="flex flex-row status_bar px-4 items-center h-20 box-border">
        <text
          :class="
            clsx('expend mr-4 ', {
              'text-xl borderB font-semibold !text-white ': curPayType === 1,
              'text-mainGray': curPayType !== 1,
            })
          "
          @click="changePayType(1)"
          >支出</text
        >
        <text
          :class="
            clsx('income', {
              'text-xl borderB font-semibold !text-white': curPayType === 2,
              'text-mainGray': curPayType !== 2,
            })
          "
          @click="changePayType(2)"
          >收入</text
        >
      </view>
      <view class="rounded-3xl h-80 bg-white shadow py-4 m-4">
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
                clsx('px-3 rounded-2xl w-10 h-7 leading-7 text-base text-center mr-4 ', {
                  'bg-main text-white': curGran === 'month',
                  'bg-mainGray': curGran !== 'month',
                })
              "
              >月</view
            >
            <view
              @click="changeGran('year')"
              :class="
                clsx('px-3 rounded-2xl w-10 h-7 leading-7 text-base text-center mr-4 ', {
                  'bg-main text-white': curGran === 'year',
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
        <view class="flex flex-row justify-around px-6 items-center">
          <view class="all-total">
            <view class="mb-2 text-center text-primaryNine">总{{ payTypeName }}</view>
            <view class="text-xl text-main font-semibold text-center">￥{{ allAmount.all }}</view>
          </view>
          <view class="w-[1px] h-12 bg-gray-200"></view>
          <view>
            <view class="mb-2 text-center text-primaryNine">平均{{ payTypeName }}</view>
            <view class="text-xl text-main font-semibold text-center">￥{{ allAmount.avg }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex flex-col px-4 relative z-20 mb-4">
      <view class="rounded-3xl bg-white shadow p-4">
        <view class="flex justify-between w-full pt-2">
          <view class="text-lg font-semibold mb-4">{{ payTypeName }}排行</view>
          <view class="text-xs text-primaryNine">查看全部</view>
        </view>
        <view v-if="categorys && categorys.length">
          <block v-for="item in categorys" :key="item.id">
            <view class="mb-4">
              <view class="w-full flex flex-row justify-between mb-2">
                <view class="text-primarySix font-medium text-base">{{ item.cateName }}</view>
                <view class="text-main font-semibold">{{ item.total }}</view>
              </view>
              <view class="flex flex-row">
                <view class="text-xs text-primarySix mr-4">共{{ item.count }}笔</view>
                <progress
                  class="flex-1"
                  :percent="item.percent"
                  activeColor="red"
                  show-info
                  stroke-width="3"
                  border-radius="5"
                  font-size="12"
                />
              </view>
            </view>
          </block>
        </view>
        <view v-else>
          <view class="flex flex-col items-center py-10">
            <view class="text-xl text-main mb-4">暂无数据</view>
            <view class="text-xs text-primaryNine">请选择其他时间</view>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="flex flex-col px-4 relative z-20">
      <view class="rounded-3xl bg-white shadow p-4">
        <view>上期同比</view>
        <view class="charts-box">
          <qiun-data-charts
            type="pie"
            :chartData="chartsDataPie1"
            :echartsH5="true"
            :echartsApp="true"
          />
        </view>
      </view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { clsx } from 'clsx'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getBillsPayTypeByAccount } from '@/services/analyze'
import { getBillsByAccount } from '@/services/bill'
//下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import demodata from '@/mockdata/demodata.json'
import { formatDate } from '@/utils'
import { useAccountStore } from '@/store'
const allAmount = ref({
  all: 0,
  avg: 0,
})
const account = useAccountStore()
const date = ref(formatDate(new Date(), 'YYYY-MM'))
// payType 1 支出 2 收入
const curPayType = ref<number>(1)
const curGran = ref<string>('month')

const payTypeName = computed(() => {
  return curPayType.value === 1 ? '支出' : '收入'
})

const categorys = ref()
const changeGran = (val: string) => {
  curGran.value = val
  if (val === 'year') {
    date.value = formatDate(new Date(), 'YYYY')
  } else {
    date.value = formatDate(new Date(), 'YYYY-MM')
  }
  onFresh()
}

// 月份切换 进行查询数据
const bindDateChange = (e) => {
  date.value = e.detail.value
  onFresh()
}

const changePayType = (val: number) => {
  curPayType.value = val
  onFresh()
}

const chartsDataPie1 = ref({})
const chartsDataLine3 = ref({})
const getServerData = async () => {
  const data = await getBillList()
  if (data && data.bills) {
    allAmount.value.all = curPayType.value === 1 ? data.totalExpense : data.totalIncome
    allAmount.value.avg = +(allAmount.value.all / data.bills.length).toFixed(2)
    const categoryData = data.bills.map((el) => {
      return el.titleDate
    })
    const seriesData = data.bills.map((el) => {
      return curPayType.value === 1 ? el.totalExpense : el.totalIncome
    })
    //支出趋势
    let linearareadata = {
      categories: categoryData,
      series: [
        {
          name: '金额',
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
          data: seriesData,
        },
      ],
    }
    chartsDataLine3.value = linearareadata
  }

  // 前十消费类型占比
  chartsDataPie1.value = JSON.parse(JSON.stringify(demodata.PieA))
}
// 获取每天数据
const getBillList = async (name?: string) => {
  if (account.curAccount) {
    const res = await getBillsByAccount({
      page: 1,
      size: 31,
      startTime: dayjs(date.value)
        .startOf(curGran.value === 'month' ? 'M' : 'y')
        .format('YYYY-MM-DD'),
      endTime: dayjs(date.value)
        .endOf(curGran.value === 'month' ? 'M' : 'y')
        .format('YYYY-MM-DD'),
      accountId: account.curAccount.id,
      asc: 'true',
    })
    if (res.data) {
      return res.data
    }
  }
}

// 获取同类项数据
const getPayTypeList = () => {
  if (account.curAccount?.id) {
    getBillsPayTypeByAccount(curPayType.value, {
      accountId: +account.curAccount?.id,
      startTime: dayjs(date.value).startOf('M').format('YYYY-MM-DD'),
      endTime: dayjs(date.value).endOf('M').format('YYYY-MM-DD'),
    }).then(({ data }) => {
      if (data && Array.isArray(data)) {
        categorys.value = data.slice(0, 6)
      }
    })
  }
}

// onfresh
const onFresh = async () => {
  await getServerData()
  await getPayTypeList()
}
onShow(() => {
  onFresh()
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
  position: absolute;
  top: 0;
  left: 0;
}
</style>
