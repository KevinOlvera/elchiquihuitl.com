import { IMAGES_ENDPOINT, api } from '.'

export async function uploadImage (image: File) {
  const formData = new FormData()
  formData.append('image', image)

  const response = await api.post(
    `${IMAGES_ENDPOINT}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response
}
