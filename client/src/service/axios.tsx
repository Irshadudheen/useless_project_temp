import axios from 'axios'

const Api = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
    headers:{
        "Content-Type": 'application/json',
        "credentials":true,
        "Authorization": 'Bearer' + localStorage.getItem('token')|| '',
        
   },

  
})

export default Api;