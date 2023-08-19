import {API} from '.'

export const createPromo = async(promo) => await API.post('/promos',promo)

export const getAllPromos = async() => await API.get('/promos');

export const deletePromo = async(id) => await API.delete(`/promos/${id}`)

export const getPromoById = async(id) => await API.get(`/promos/${id}`)

export const updatePromo = async(id,promo) => await API.put(`/promos/${id}`,promo)