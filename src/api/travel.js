import request from '@/utils/request'

export const travelGetToursService = (params) =>
  request.get('/tours/page', { params })

export const travelGetSightsService = (params) =>
  request.get('/attractions/page', { params })

export const travelUploadToursService = ({ name, description, img }) =>
  request.post('/tours', { name, description, img })

export const travelUploadSightsService = ({ name, description, img }) =>
  request.post('/attractions', { name, description, img })

export const travelGetCommentService = ({ id }) =>
  request.get('/comments', { id })

export const travelUploadCommentService = ({ uid, content, id }) =>
  request.post('/comments', { uid, content, id })
