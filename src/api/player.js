import {API} from '.'

export const addPlayer = async(playerData) => API.post('/player/create-player',playerData)

export const playerList = async() => API.get('/player/list/all')

export const playerDetails = async(id) => API.get(`/player/${id}`)

export const deletePlayer = async(id) => API.delete(`/player/delete/${id}`)

export const updatePlayer = async(id,playerData) => API.put(`/player/update-player/${id}`,playerData)