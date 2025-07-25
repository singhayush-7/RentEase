import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { resetError } from '../redux/user/userSlice';
 
import Oauth from '../components/Oauth';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
function Signin() {
   const [formData,setFormData]=useState({});//
//Initially empty
// Initializes a state variable formData (object) to store user input (username, email, password).

const{loading,error}=useSelector((state)=>state.user)//Boolean to control loading state — disables button and shows "Loading..." while request is in progress.
  const navigate=useNavigate();//A hook from react-router-dom used to redirect users to another route after signup (e.g., to /signin).

const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

 
//   Updates the formData object as the user types.

// e.target.id refers to the input's id (username, email, or password).

// Uses spread syntax to keep previous values.
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    
    })
  }

  const handleSubmit=async(e)=>{
       e.preventDefault();
    try{
      //prevents page fro refreshing
     
  dispatch(signInStart())//Shows loading indicator.

 
// When the user submits the form, this line:

// Calls the route /api/auth/signup

// Sends the formData in the request body

// Tells the server "This is a JSON POST request"

// 3. Backend interacts with the database
// In the above route:

 
// User.create(...) inserts a new user into the database.

// Uses libraries like Mongoose (for MongoDB) or Sequelize (for SQL).
    const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    })
// If backend responds with { success: false, message: "..." }, the error is shown and the function exits.
    const data=await res.json();
     if (data.success==false){
     dispatch(signInFailure(data.message))
      return;
     }
//      Signup success:

// Hide loading

// Clear errors

// Redirect to sign-in page
    dispatch(signInSuccess(data))
     navigate('/')
    }
    //Catches network or server errors and sets them in the error state.
   catch(error) {
     dispatch(signInFailure(error.message))
    } 
  
    
    
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
    <h1 className="text-3xl text-center font-semibold mb-6 text-gray-800">Sign In</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* /* <input
        onChange={handleChange}
        type="text"
          id="username"
        placeholder="Username"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */ }
      <input
        onChange={handleChange}
        type="email"
          id="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        onChange={handleChange}
        type="password"
          id="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
       
      >
        {loading ?'Loading...':'Sign In'}
      </button>
    </form>
    <div className="mt-3">
  <Oauth />
</div>

     
    <div className='flex gap-2 mt-5 '>
       <p>Don't Have an Account?</p>
    <Link to={'/signup'}>
    <span className='text-blue-700'>SignUp</span>
    </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
  
   
  </div>
</div>

  )
}

export default Signin
 