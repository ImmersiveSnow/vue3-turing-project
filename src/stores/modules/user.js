import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'the-user',
  () => {
    const token = ref('')
    const setToken = (newtoken) => (token.value = 'Bearer ' + newtoken)

    const removeToken = () => (token.value = '')

    const userInfo = ref({})
    const getUser = async () => {
      if (!userInfo.value) {
        const res = await userGetInfoService()
        userInfo.value = res.data.data
      }
    }

    const setUser = (obj) => (userInfo.value = obj)
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
