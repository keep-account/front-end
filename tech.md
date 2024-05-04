# 技术

## 问题

- 数据库保存两位数，保存不对
- 编辑账单
- 登录完之后 跳转到首页刷新页面

## 请求链路

- 请求用户信息，如果 request 没有携带 token 则需要调登录接口拿到 token，然后塞到本地存储
- app.vue 如果本地有账本信息，则继续请求当前账本的列表信息 如果没有账本信息则需要请求用户信息 拿到第一个账本
- index.vue 通过第一个账本信息 拿到账单信息列表

## 技术 vue3+uniapp

- [uniapp ui](https://uniapp.dcloud.net.cn/component/web-view.html)
- [vue3](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)

## 首页

## 个人页

## 资料

- [项目实战](https://megasu.gitee.io/uni-app-shop-note/rabbit-shop/)
- [pinia](https://pinia.vuejs.org/zh/getting-started.html)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)
- [uni.addInterceptor](https://uniapp.dcloud.net.cn/api/interceptor.html)
- [小程序登录官网](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
- [小程序登录](https://juejin.cn/post/7152682507916771358?searchId=20240424193108D4A8E073DE28E2A7A657#heading-21)
- [微信 小程序 session_key 维护](https://segmentfault.com/a/1190000041686385)
- [头像昵称填写](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)
- [css 中的 grid 布局](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)，搞一个数字键盘
- [tailwindcss](https://tailwindcss.com/docs/grid-template-columns)

#### UI

- 骨架屏
- [iconfont](https://www.iconfont.cn/manage/index?spm=a313x.home_index.i3.22.76033a810VqNXj&manage_type=myprojects&projectId=3252181)
- [UI 参考](https://www.zcool.com.cn/work/ZMzc1OTE2MDA=.html)
- [字体](https://www.iconfont.cn/manage/index?spm=a313x.icontype_collection.i1.db775f1f3.64913a81GsXNFG&manage_type=myprojects&projectId=4492642)
- [写法](https://megasu.gitee.io/uni-app-shop-note/rabbit-shop/category.html)
- [uv ui](https://www.uvui.cn/components/lineProgress.html)
