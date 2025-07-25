import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
 import Home from './pages/Home'
 import About from './pages/About'
 import Profile from './pages/Profile'
 import Signup from './pages/Signup'
 import Signin from './pages/Signin'
 import Createlisting from './pages/Createlisting'
 import Header from './components/Header'
 import PrivateRoute from './components/PrivateRoute'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
 function App() {
   return (
     <div >
    
       <Header/>
       
       <Routes>
        <Route path="/"  element={<Home/>}/> 
        <Route path="/about"  element={<About/>}/> 
        
        <Route path="/signup"  element={<Signup/>}/> 
        <Route path="/signin"  element={<Signin/>}/> 
        <Route path="/search"  element={<Search/>}/>
     <Route path="/listing/:listingId"  element={<Listing/>}/> 
         <Route element={<PrivateRoute />}>
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<Createlisting />} />
          <Route path="/updatelisting/:listingId" element={<UpdateListing />} />
          
        </Route>
       </Routes>
 
     </div>
   )
 }
 
 export default App
 