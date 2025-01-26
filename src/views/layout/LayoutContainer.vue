<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
import router from '@/router'

// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

const toExit = async () => {
  await ElMessageBox.confirm('你确认退出吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  userStore.removeToken()
  userStore.setUser({})
  userStore.setId('')

  router.push(`/login`)
}
</script>

<template>
  <el-row class="tac layout-container">
    <el-col :span="3" class="menu-body">
      <el-menu
        router
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#232323"
        class="el-menu-vertical-demo"
        text-color="#E5EAF3"
      >
        <div class="userAvatar">
          <el-avatar :size="55" :icon="UserFilled" />
          <el-text tag="Ins" size="large" type="info">
            User#{{ userStore.userId || 1337 }}</el-text
          >
          <el-button @click="toExit" type="info" round>退出</el-button>
        </div>
        <el-menu-item index="/travel/tours"> 旅游团 </el-menu-item>
        <el-menu-item index="/travel/sights"> 景点 </el-menu-item>
        <el-menu-item index="/order"> 订单 </el-menu-item>
      </el-menu>
    </el-col>

    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style lang="less">
.layout-container {
  height: 100vh;
  overflow: hidden;

  .menu-body {
    height: 100vh;

    .el-menu {
      height: 100%;

      .userAvatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        row-gap: 20px;
        user-select: none;
      }
      .el-menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        height: 60px;
        font-size: 20px;
        user-select: none;
      }
    }
  }
}
</style>
