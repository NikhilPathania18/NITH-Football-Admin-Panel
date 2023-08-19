import {API} from '.'

export const getAllImages = async()=>   await API.get('/gallery')

export const updateGallery = async(galleryData) =>  await API.put('/gallery',galleryData)