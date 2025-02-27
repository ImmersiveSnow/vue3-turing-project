import request from '@/utils/request'

export const orderGetListService = ({ page, size, uid }) =>
  request.get('/orders/page', { params: { page, size, uid } })

export const orderDelService = (orderID, uid) =>
  request.delete('/orders', { data: { orderID, uid } })

export const orderPutService = (uid, toursId, title, number) =>
  request.put('/orders', { uid, toursId, title, number })
