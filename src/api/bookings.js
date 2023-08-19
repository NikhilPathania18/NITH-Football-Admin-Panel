import {API} from '.'

export const getAllBookings = async() => await API.get('/bookings')