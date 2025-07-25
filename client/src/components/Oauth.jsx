import React from 'react';
import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function Oauth() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick=async()=>{
    try{
       const provider=new GoogleAuthProvider()
       const auth=getAuth(app)

       const result=await signInWithPopup(auth,provider)
       const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
          credentials: "include",
        body:JSON.stringify({
          name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
        })
       const data=await res.json()
        
   dispatch(signInSuccess(data))
    navigate('/');
    }catch(error){
      console.log('couldnot sign with google',error)
    }
  }
  return (
  <div className="flex justify-center px-4">
    
  <button
  onClick={handleGoogleClick}  
  type='button' className="flex items-center gap-2 bg-red-500 text-white border border-green-300 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition duration-300 hover:bg-blue-500 text-sm sm:text-base w-full max-w-xs">
    <span className="text-xl">🔍</span> {/* replace with actual icon later */}
    Continue with Google
  </button>
</div>
  )
}

export default Oauth
 