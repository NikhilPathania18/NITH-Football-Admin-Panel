import {API} from '.'

export const addPlayer = async(playerData) => await API.post('/player/create-player',playerData)

export const playerList = async() => await API.get('/player/list/all')

export const playerDetails = async(id) =>await  API.get(`/player/${id}`)

export const deletePlayer = async(id) => await API.delete(`/player/delete/${id}`)

export const updatePlayer = async(id,playerData) => await API.put(`/player/update-player/${id}`,playerData)