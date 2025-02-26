import request from '@/utils/request'

export const travelGetToursService = (params) =>
  request.get('/tours/page', { params })

export const travelGetSightsService = (params) =>
  request.get('/attractions/page', { params })

export const travelUploadSightsService = (formData) =>
  request.post('/attractions', formData)

export const travelUploadToursService = (formData) => {
  return request.post('/tours', formData, {
    headers: {
      'content-Type': 'multipart/form-data'
    }
  })
}

export const travelGetCommentService = ({ id }) =>
  request.get('/comments', { id })

export const travelUploadCommentService = ({ uid, content, id }) =>
  request.post('/comments', { uid, content, id })
