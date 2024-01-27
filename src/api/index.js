import axios from 'axios'
// export const API = axios.create({baseURL: `http://localhost:8000`});
export const API = axios.create({baseURL: `https://football-backend-nikhil.vercel.app`});

API.interceptors.request.use((req) => {
    const user = localStorage.getItem('user')
    if(user){
        const {token} = JSON.parse(user)
        req.headers['x-api-key'] = token
    }
    return req;
});