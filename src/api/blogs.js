import {API} from '.'

export const createBlog = async(blog) => await API.post('/blogs',blog)

export const getImageLink = async(imageData) => await API.post('/image', imageData)

export const getBlogById = async(id) => await API.get(`/blogs/${id}`);

export const getAllBlogs = async() => await API.get('/blogs')

export const updateBlog = async(id,blogData) => await API.put(`/blogs/${id}`,blogData)

export const deleteBlog = async(id) => await API.delete(`/blogs/${id}`)