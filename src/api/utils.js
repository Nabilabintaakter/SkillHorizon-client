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

export const shortImageName = (image, length = 10) => {
  console.log(image)
  if (!image || typeof image?.name !== 'string') return 'Choose Image'
  if (image?.name.length <= 15) return image?.name
  return image?.name
    .substring(0, length)
    .concat(`...${image?.type.split('/')[1]}`)
}