import { API } from "."

export const createTrip = async(tripData) => await API.post('/trips',tripData)

export const getTrip = async() => await API.get('/trips')

export const getTripById = async(id) => await API.get(`/trips/${id}`)

export const updateTrip = async(id,form) => await API.put(`/trips/${id}`,form)

export const deleteTrip = async(id) => await API.delete(`/trips/${id}`)