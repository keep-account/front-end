# 初衷

记录 7 年来的前端苦逼生涯，每次面试都需要好好准备，现在就把前面 7 年积攒的经验沉淀下来，希望能给后面的前端同学带来帮助

## 终端

主要是通过微信小程序呈现，也会布局在 h5 端,前提还得先做一版 PC 端，这样好增删改查，小程序/h5 只是纯展示.h5 登录需要微信小程序端扫码登录即可

## todolist

- [] 账单图表分析
- [] 增加账单的时候，如果切换支出的时候，在新增的时候还是支出的分类
- [] 编辑账目的时候 名称变更未实现

## 页面模块拆解

### 全局拦截

- 如果没有用户信息，则需要调小程序登录信息，不然怎么保存用户信息

### 首页

- 1.月粒度切换
- 2.账本切换

### 分析

三个模块组成

- 支出和收入折线图
- 合并同类项
- 上期同比 扇形图
- 图表库来自 [ucharts](https://www.ucharts.cn/v2/#/demo/index)

### 账本

### 我的

- 用户信息
- 修改用户信息，修改昵称和头像，更新用户表

## 服务端接口部署

- API 测试

推荐用[apifox](https://app.apifox.com/project/4273966)进行调试

> before https://speeding-flare-397213.postman.co/workspace/niaogege~0a1d4cce-5e1f-4a4f-88e9-50e14a3323db/request/2181046-b4751804-ea47-4c31-8267-cce94751cf3b

- 增删改查
- 服务端接口部署
- 针对白名单进行展示入口，进行题库增加
