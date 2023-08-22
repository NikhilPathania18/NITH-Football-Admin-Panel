import {API} from '.'

export const login = async(data) => await API.post('/auth/login',data);

export const forgotPassword = async(email) => await API.post('/forgot-password',{email})