import {API}  from '.'
export const createFaq = async(form)=>{return await API.post('/faqs',form)};

export const getFaq = async() => {return await API.get('/faqs');}

export const getFaqById = async(id)=>{return await API.get(`/faqs/${id}`)}

export const updateFaq = async(id,form)=>{return await API.put(`/faqs/${id}`,form)}

export const deleteFaq = async(id) => {return await API.delete(`/faqs/${id}`)}
