import { useUserStore } from '@/stores/modules/user'
import axios from 'axios'
const baseURL = 'http://localhost:3000'
import router from '@/router'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.status === 200 || res.status === 201) {
      return res
    }
    console.log(res.data.message)

    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err.response)
  }
)

export default instance
export { baseURL }
