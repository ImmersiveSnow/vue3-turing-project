import request from '@/utils/request'

export const orderGetListService = (params) =>
  request.get('/orders/page', { params })

export const orderDelService = ({ orderId, userId }) =>
  request.delete('/orders', { orderId, userId })

export const orderPutService = ({ uid, toursId, title }) =>
  request.put('/orders', { uid, toursId, title })
