<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getUseInfo } from '@/services/user'
import { useAccountStore, useUserStore } from '@/store'
onLaunch(() => {})
onShow(async () => {
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  if (!accountStore.curAccount) {
    const resData = await getUseInfo()
    userStore.setProfile({
      username: resData.data.username,
      avatar: resData.data.avatar,
      signature: resData.data.signature,
      openid: resData.data.openid,
      id: resData.data.id,
    })
    accountStore.setCurAccount(resData.data.shareAccounts[0])
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
