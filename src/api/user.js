import request from '@/utils/request'

export const userRegisterService = ({ username, password }) =>
  request.post('/users/register', { username, password })

export const userLoginService = ({ username, password }) =>
  request.get('/users/login', { username, password })

export const userGetInfoService = () => request.get('/users/currentUser')
