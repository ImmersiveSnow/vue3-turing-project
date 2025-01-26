import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'the-user',
  () => {
    const token = ref('')
    const setToken = (newtoken) => (token.value = newtoken)
    const userId = ref()
    const setId = (Id) => (userId.value = parseInt(Id))

    const removeToken = () => (token.value = '')

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()

      user.value = res.data
    }

    const setUser = (obj) => (user.value = obj)
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      setId,
      userId
    }
  },
  {
    persist: true
  }
)
