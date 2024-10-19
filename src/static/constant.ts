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
    title: '账本分析',
    icon: 'icon-price-up',
    link: '/pages/analyze/index',
  },
  {
    title: '年度账本',
    icon: 'icon-unlock',
  },
  {
    title: '常用工具',
    icon: 'icon-Tools',
    link: '/pages/tool/index',
  },
]

export type HomeIconsType = typeof HomeIcons
