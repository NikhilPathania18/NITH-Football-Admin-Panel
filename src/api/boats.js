import { API } from "."

export const createBoat = async(details) => await API.post('/boats-yachts',details)

export const getBoats = async() => await API.get('/boats-yachts'); 

export const getBoatDetails = async(id) => await API.get(`/boats-yachts/${id}`)
 
export const boatYachtUpdateById = async(id,form) => await API.put(`/boats-yachts/${id}`,form)

export const boatYachtDeleteById = async(id) => await API.delete(`/boats-yachts/${id}`)
