<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getUseInfo } from '@/services/user'
import { useAccountStore, useUserStore } from '@/store'
onLaunch(() => {
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  if (!accountStore.curAccount) {
    getUseInfo()
      .then((res) => {
        // 1.拿到账本信息
        console.log(res, '获取用户信息')
        // 2.默认第一个为当前账本信息
        accountStore.setCurAccount(res.data.shareAccounts[0])
      })
      .catch((err) => console.log(err, 'APP.vue'))
  } else {
    getUseInfo().then((res) => {
      userStore.setProfile({
        username: res.data.username,
        avatar: res.data.avatar,
        signature: res.data.signature,
        openid: res.data.openid,
        id: res.data.id,
      })
    })
    // 当前本地已经有账本信息了
    uni.showModal({
      title: '当前账本信息' + accountStore.curAccount.accountName,
      content: accountStore.curAccount.id + '' + accountStore.curAccount.userId,
      showCancel: true,
      success: ({ confirm, cancel }) => {},
    })
  }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
