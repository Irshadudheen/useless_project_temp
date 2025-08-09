import React from 'react'
import Input from './components/input'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Home from './pages/home'
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App() {
  return (
    <div>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    
    
      <Routes>
        <Route path='/'               element={<Home/>}/>
       
      
      </Routes>
     
     
     
      
      </GoogleOAuthProvider>
     
    </div>
  )
}
