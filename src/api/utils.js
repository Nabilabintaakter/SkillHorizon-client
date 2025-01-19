import axios from 'axios'
// Upload image and return image url

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)
  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return response.data?.data?.url;
}