import { API } from "."

 
export const createAddon = async(form) => await API.post('/addons',form) 

export const getAddons = async() => await API.get('/addons')

export const getAddonById = async(id) => await API.get(`/addons/${id}`)

export const updateAddon = async(id,formData) => await API.put(`/addons/${id}`,formData)

export const deleteAddon = async(id) => await API.delete(`/addons/${id}`) 

