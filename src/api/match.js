import {API} from '.'

export const getTournamentsList = async() => await API.get('/tournament/list/all');

export const createMatch = async(matchData) => await API.post('/match/new-match',matchData)

export const getMatchesList = async() => await API.get('/match/list/all')

export const endMatch = async(id) => await API.put(`/match/end-match/${id}`);

export const deleteMatch = async(id) => await API.delete(`/match/delete/${id}`)

export const getMatchDetails = async(id) => await API.get(`/match/details/${id}`)

export const updateScore = async(id,team,event) => await API.put(`/match/update-score/${id}`,{team,event})

export const startMatch = async(id,half) => await API.put(`/match/start-half/${id}`,{half})

export const updateEvent = async(id,team,event) => await API.put(`/match/add-event/${id}`,{team,event})