import { API } from ".";

export const createNews = async(news) => await API.post('/news/new-news', news)

export const getAllNews = async() => await API.get('/news/all')

export const setMainNews = async(id) => await API.post(`/news/main-news/${id}`)

export const deleteNews = async(id) => await API.delete(`/news/${id}`)