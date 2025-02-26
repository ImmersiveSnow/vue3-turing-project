import request from '@/utils/request'

export const orderGetListService = ({ page, size, uid }) =>
  request.get('/orders/page', { params: { page, size, uid } })

export const orderDelService = ({ orderId, userId }) =>
  request.delete('/orders', { orderId, userId })

export const orderPutService = ({ uid, toursId, title, count }) =>
  request.put('/orders', { uid, toursId, title, count })
