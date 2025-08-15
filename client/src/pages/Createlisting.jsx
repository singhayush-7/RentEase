import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Createlisting() {
  const { currentUser } = useSelector((state) => state.user);
 const token = currentUser?.access_token; 
  const [files, setFiles] = useState([]);
   const navigate = useNavigate();
    const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({ imageUrls: [],
  name:'',
  description:'',
  address:'',
  type:'',
  bedrooms:1,
  bathrooms:1,
  regularPrice:50,
  discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,

   });

  console.log(formData);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: formData,
});


    const data = await res.json();
      
    return data.imageUrl;
  }; 
 

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      try {
        const uploadedUrls = [];

        for (let i = 0; i < files.length; i++) {
          const url = await uploadImage(files[i]);
          uploadedUrls.push(url);
        }

        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...uploadedUrls],
        }));
        setUploading(false);
      } catch (error) {
        console.error(error);
        setImageUploadError('Image upload failed');
        setUploading(false);
      }
    } else {
      setImageUploadError('Maximum image limit of 6 exceeded');
      setUploading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange=(e)=>{
    if(e.target.id==='sale'  || e.target.id==='rent'){
      setFormData({
        ...formData,
        type:e.target.id,
      })
    }
    if(e.target.id==="parking"||
      e.target.id==="furnished" ||
      e.target.id==='offer'
    ){
       setFormData({
        ...formData,
        [e.target.id]:e.target.checked,
       })
    }
    if( e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'){
         setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      }
  }
 
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
       if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
       setLoading(true);
      setError(false);
       const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
          credentials: 'include',
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
       const data = await res.json();
         console.log('✅ Listing Created:', data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      } catch (error) {
         setError(error.message); 
      setLoading(false);
      }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create a Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-sm sm:text-base">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                   id='name'
            maxLength='62'
            minLength='10'
            required
                onChange={handleChange}
                value={formData.name}
                className="w-full p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                 id='address'
            required
            onChange={handleChange}
            value={formData.address}
              />
            </div>
            <textarea
              placeholder="Description"
              rows={4}
              className="mt-4 w-full p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                id='description'
            required
            onChange={handleChange}
            value={formData.description}
            ></textarea>
          </div>

          {/* Listing Type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Listing Type</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input  
                     onChange={handleChange}
                checked={formData.type === 'sale'}
                   id='sale' type="radio" name="type" />
                <span>Sell</span>
              </label>
              <label className="flex items-center gap-2">
                <input id="rent"
                 onChange={handleChange}
                checked={formData.type === 'rent'}
                 type="radio" name="type" />
                <span>Rent</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                   id='parking'
                   onChange={handleChange}
                checked={formData.parking} 
                 type="checkbox" />
                Parking Spot
              </label>
              <label className="flex items-center gap-2">
                <input 
                  id='furnished'
                   onChange={handleChange}
                checked={formData.furnished}  
                 type="checkbox" />
                Furnished
              </label>
              <label className="flex items-center gap-2">
                <input 
                 id='offer'
                   onChange={handleChange}
                checked={formData.offer} 
                type="checkbox" />
                Offer
              </label>
            </div>
          </div>

          {/* Rooms & Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Rooms & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <input
                    id='bedrooms'
                min='1'
                max='10'
                required
                  type="number"
                  placeholder="Beds"
                  className="w-24 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    onChange={handleChange}
                value={formData.bedrooms}
                />
                <span>Beds</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                    id='bathrooms'
                min='1'
                max='10'
                required
                  type="number"
                  placeholder="Baths"
                  className="w-24 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    onChange={handleChange}
                value={formData.bathrooms}
                />
                <span>Baths</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Regular Price"
                   id='regularPrice'
                min='50'
                max='10000000'
                required
                  className="w-29 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                   onChange={handleChange}
                value={formData.regularPrice}
                />
                 
               {formData.type === 'rent' && (
                  <span className='text-xs'>(₹ 
/ month)</span>
                )}
              </div>

            {formData.offer  &&(<div className="flex items-center gap-2">
                <input
                  type="number"
                   id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  placeholder="Discount Price"
                  className="w-29 p-3 rounded border border-black-300 focus:border-blue-800 focus:ring-blue-800 focus:outline-none"
                   onChange={handleChange}
                  value={formData.discountPrice}
                />
                
                  {formData.type === 'rent' && (
                    <span className='text-xs'>(₹
 / month)</span>
                  )}
              </div>
                )}
            </div>
          
          </div>

          {/* Image Upload Section */}
          <div className="mt-6">
            <p className="text-gray-800 font-semibold mb-2">
              Images:
              <span className="text-gray-500 text-sm ml-1">
                (Max 6, first image will be the cover)
              </span>
            </p>

            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="w-full sm:w-auto border border-gray-800 p-2 rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />

              <button
                disabled={uploading}
                onClick={handleImageSubmit}
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>

            {imageUploadError && (
              <p className="text-red-600 mt-2 text-sm">{imageUploadError}</p>
            )}

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {formData.imageUrls.map((url, index) => (
    <div key={index} className="relative">
      <img
        src={url}
        alt={`uploaded ${index}`}
        className="w-32 h-32 object-cover rounded"
      />
      <button
        type="button"
        onClick={() => handleRemoveImage(index)}
        className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-700 text-xs shadow hover:bg-red-100"
      >
        ✖
      </button>
    </div>
  ))}
</div>

          </div>

          {/* Submit Button */}
          <div className="text-center">

             <button
            disabled={loading || uploading}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
           {error && <p className='text-red-700 text-sm'>{error}</p>} 
            
          </div>
        </form>
      </div>
    </div>
  );
}
