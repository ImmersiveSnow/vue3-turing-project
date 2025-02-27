import request from '@/utils/request'

export const travelGetToursService = (params) =>
  request.get('/tours/page', { params })

export const travelGetSightsService = (params) =>
  request.get('/attractions/page', { params })

export const travelUploadSightsService = (formData) =>
  request.post('/attractions', formData)

export const travelUploadToursService = (formData) =>
  request.post('/tours', formData)

export const travelGetCommentService = (exclusiveID) =>
  request.get('/comments', { params: { exclusiveID } })

export const travelUploadCommentService = ({ uid, content, exclusiveID }) =>
  request.post('/comments', { uid, content, exclusiveID })
