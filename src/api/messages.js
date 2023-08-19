import {API}  from '.'

export const getAll = async() => await API.get('/contacts')

export const getUnReplied = async() => await API.get('/replied-messages')

export const replyToUser = async(id,reply) => await API.post(`/reply/${id}`,{reply})

export const getUnSeen = async() => await API.get('/unseen-messages')

export const deleteMessage = async(id) => await API.delete(`/contacts/${id}`)