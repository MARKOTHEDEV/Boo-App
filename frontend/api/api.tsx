import { deleteAllCookies } from '@/utils/extraFunction';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export const NEXT_PUBLIC_APP_API_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://127.0.0.1:8000/"

const api = axios.create({
    baseURL: NEXT_PUBLIC_APP_API_URL,
    timeout: 10000,
});

api.defaults.timeout = 10000;
api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['Accept'] = 'application/json';


api.interceptors.request.use(
    (config:any) => {
        const authToken = Cookies.get('accessToken');
        if (authToken) {
            //config.headers['Authorization'] =  "token "+authToken; // for general token wize
            config.headers['Authorization'] = "JWT " + authToken;
        }
        return config
    },
    (error:any) => {
        Promise.reject(error)
    }
)


api.interceptors.response.use(
    (response:any) => {
        return response.data
    },
    (error:any) => {
        if (error.response.status === 500) {
            console.log("Internal Server Error");
        }
        
        else if (error.response.status === 401) {
            localStorage.clear()
            deleteAllCookies(); 

        }
        return Promise.reject(error)
    }
);


export default api