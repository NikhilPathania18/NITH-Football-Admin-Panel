import {API} from '.'

export const getAllUsers = async() => await API.get('/users')

export const deleteUser = async(id) => await API.delete(`/users/${id}`)

export const blockUser = async(id) => await API.put(`/block/${id}`)

export const unBlockUser = async(id) => await API.put(`/unblock/${id}`)
