import {API} from '.'

export const createStaticData = async(data) => await API.put("/static",data)

export const getStaticData = async() => await API.get('/static');

export const updateFooter = async(data) => await API.put('/static',data);