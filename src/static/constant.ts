export const PayTypeNum = [1, 2, 3] // 支出/收入/不计入收支
export const PayType = [
  {
    id: 1,
    title: '支出',
  },
  {
    id: 2,
    title: '收入',
  },
  {
    id: 0,
    title: '不计入收支',
  },
] // 支出/收入/不计入收支

export const HomeIcons = [
  {
    title: '我的账本',
    icon: 'icon-lishijilu',
    link: '/pages/account/index',
  },
  {
    title: '日历记账',
    icon: 'icon-lishijilu',
  },
  {
    title: '年度账本',
    icon: 'icon-new',
  },
  {
    title: '常用功能',
    icon: 'icon-new',
  },
]

export type HomeIconsType = typeof HomeIcons
