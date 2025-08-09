import axios from "axios";
import Api from "../service/axios";
// export const decodedToken = async (token:any)  =>{
//     try {
//         const {data} = await axios.get(import.meta.env.VITE_GOOGLE_API, {
//             headers: {
//                 Authorization:'Bearer ' + token
//             }}
//         )
//         console.log('Decoded Token Data:', data);
//       const userData=  await userGoogleLogin(data)
//       console.log(userData)
//        return userData
//     } catch (error) {
//         console.log(error)
//         throw error 
//     }
// }
// export const userGoogleLogin = async (loginData:any)=>{
//     try {
        
//         const {data} = await Api.post('users/googleAuth',{loginData})
//         console.log('User Google Login Data:', data);
//        await localStorage.setItem('token', data)
//         return data
//     } catch (error) {
//         throw error
//     }
// }
export const createShortUrl = async (longUrl:string, customName:string)=>{
    try {
        console.log(localStorage.getItem('token'),'the local storage token')
        const {data} = await Api.post('url',{longUrl, customName,headers:{'Authorization':localStorage.getItem('token')|| ''}})
        console.log('Short URL Creation Data:', data);
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}