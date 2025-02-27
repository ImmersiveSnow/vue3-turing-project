import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'the-user',
  () => {
    const token = ref('')
    const setToken = (newtoken) => (token.value = 'Bearer ' + newtoken)

    const removeToken = () => (token.value = '')

    const userInfo = ref({})

    const setUser = (obj) => (userInfo.value = obj)
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
