import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
 import { useState,useRef,useEffect } from 'react';
 
  import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { Link } from 'react-router-dom';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from '../redux/user/userSlice';
import { Navigate } from 'react-router-dom';
function Profile() {
   const fileRef = useRef(null);
    const [userListings, setUserListings] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
   const [showListingsError, setShowListingsError] = useState(false);
  const [formData, setFormData] = useState({});
const [updateSuccess, setUpdateSuccess] = useState(false);


   const dispatch = useDispatch();


 useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
}, [file]);

const handleFileUpload = async (file) => {
  const formDataToSend = new FormData();
  formDataToSend.append('file', file);
  formDataToSend.append('upload_preset', 'profile_upload');  
     
  try {
     
    setFilePerc(30);  
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dwfdtih2k/image/upload',
      {
        method: 'POST',
        body: formDataToSend,
      }
    ); 

    const data = await res.json();
    if (data.secure_url) {
      setFilePerc(100);
      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
    } else {
      setFileUploadError(true);
    }
  } catch (error) {
    console.error(error);
    setFileUploadError(true);
  }
};


   const handledeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data=await res.json();
       if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
   }
  
const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(currentUser._id)
      

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));

        return;
      }

      dispatch(updateUserSuccess(data));
      
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};
 
const handleShowListings = async () => {
   console.log('📢 Show listings clicked'); // Add this
    try {
      setShowListingsError(false);
     const res = await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`, {
  credentials: 'include',
});

      const data = await res.json();
       console.log('📦 Listings Response:', data); // Add this
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
        console.error('❌ Error fetching listings:', error);
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
   <div className="w-full max-w-2xl mx-auto mt-10 bg-white px-4 sm:px-6 md:px-8 py-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
<form onSubmit={handleSubmit}  >
  <input   onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'></input>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center my-4 text-center">
  <img
  onClick={()=>{
    fileRef.current.click()
  }}
    src={formData.avatar || currentUser.avatar}
    alt="profile"
    className="w-24 h-24 rounded-full object-cover cursor-pointer"
  />
  <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
</div>


      <div className="space-y-5">
        {/* Username Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
          id="username" 
            type="text"
            defaultValue={currentUser.username}
  onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
            placeholder=" "
          />
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
           id="email" 
            type="email"
           defaultValue={currentUser.email}
  onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
            placeholder=" "
          />
        </div>

        {/* Password Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
           id="password"
            type="password"
           onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none"
            placeholder=" "
          />
        </div>

        {/* Update Button */}
       <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
  >
    {loading ? 'Updating...' : 'Update'}
  </button>
<Link
  to={"/createlisting"}
  className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full text-center block"
>
  Create Listing
</Link>



           </div>
         </form>
        {/* Footer Options */}
        <div className="flex justify-between text-sm mt-4">
          <span className="text-red-500 cursor-pointer hover:underline"  
          onClick={handledeleteUser}>Delete Account</span>
          <span className="text-blue-600 cursor-pointer hover:underline"
         onClick={handleSignOut}  >Sign Out</span>
        </div>
   <p className='text-red-700 mt-5'>{error ? error : ""}</p>  
   <p className='text-green-700 mt-5'>{updateSuccess ? "profile is updated successfully" : ""}</p>  

   <button
   type='button'
   onClick={handleShowListings}
  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
>
  Show Listing
</button>
 {userListings.map((listing) => (
  <div
    key={listing._id}
    className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300"
  >
    {/* Listing Image */}
    <Link to={`/listing/${listing._id}`} className="shrink-0">
      <img
        src={listing.imageUrls[0]}
        alt="listing cover" 
        className="h-20 w-20 rounded-lg object-cover border border-gray-300"
      />
    </Link>

    {/* Listing Info */}
    <div className="flex-1">
      <Link
        to={`/listing/${listing._id}`}
        className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
      >
        {listing.name}
      </Link>
     

      <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
        {listing.address}
      </p>
    </div>

    {/* Listing Price */}
    <div className="text-right">
      <p className="text-blue-600 font-bold text-sm">
        ₹{listing.regularPrice}
        {listing.type === 'rent' && (
          <span className="text-gray-500 text-xs"> / month</span>
        )}
      </p>
       
    </div>
     <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                
    <Link to={`/updatelisting/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
  </div>
))}
  
    </div>
  
  )
}

export default Profile
