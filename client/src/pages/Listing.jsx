 
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // ✅ correct

 
import MapView from '../components/Mapview';

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
function Listing( ) {
  SwiperCore.use({Navigation})
  const [listing,setListing]=useState(null);
  
   const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
     const [copied, setCopied] = useState(false);
       const [contact, setContact] = useState(false);
  const params=useParams();
   const { currentUser } = useSelector((state) => state.user);
 

 useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
     {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
     {error && (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}
    {listing && !loading && !error && (
        <div>
          <Swiper navigation modules={[Navigation]}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-64 sm:h-80 md:h-[500px] w-full'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);// to copy the image  url
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              
            />
          </div>
           {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
        </div>
      )}
       {listing && !loading && !error && (
    <div className="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 my-10 gap-6 rounded-lg shadow-lg bg-white border border-gray-200">
  {/* Title + Price */}
 
  <p className="text-3xl font-bold text-gray-800">
    {listing.name} -{' '}
    <span className="text-indigo-600">
     ₹ 
      {listing.offer
        ? listing.discountPrice.toLocaleString('en-IN')
        : listing.regularPrice.toLocaleString('en-IN')}
      {listing.type === 'rent' && ' / month'}
    </span>
  </p>
  
  {/* Address */}
   
     <p className="flex items-center gap-2 text-gray-600 text-base mt-2">
    <FaMapMarkerAlt className="text-red-500" />
    <span>{listing.address}</span>
  </p>
   


  {/* Offer badges */}
  <div className="flex gap-4 mt-2">
    <p className="bg-indigo-700 w-full max-w-[200px] text-white text-center py-1 px-3 rounded-md shadow-md">
      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
    </p>
    {listing.offer && (
      <p className="bg-green-700 w-full max-w-[200px] text-white text-center py-1 px-3 rounded-md shadow-md">
        ${+listing.regularPrice - +listing.discountPrice} OFF
      </p>
    )}
  </div>

  {/* Description */}
  <p className="text-gray-700 mt-2">
    <span className="font-semibold text-gray-900">Description - </span>
    {listing.description}
  </p>
  

  {/* Features list */}
  <ul className="text-gray-900 font-medium text-sm flex flex-wrap items-center gap-3 sm:gap-5 mt-3">
    <li className="flex items-center gap-2">
      <FaBed className="text-blue-600 text-lg" />
      {listing.bedrooms > 1
        ? `${listing.bedrooms} Beds`
        : `${listing.bedrooms} Bed`}
    </li>
    <li className="flex items-center gap-2">
      <FaBath className="text-purple-600 text-lg" />
      {listing.bathrooms > 1
        ? `${listing.bathrooms} Baths`
        : `${listing.bathrooms} Bath`}
    </li>
    <li className="flex items-center gap-2">
      <FaParking className="text-yellow-600 text-lg" />
      {listing.parking ? 'Parking Spot' : 'No Parking'}
    </li>
    <li className="flex items-center gap-2">
      <FaChair className="text-teal-600 text-lg" />
      {listing.furnished ? 'Furnished' : 'Unfurnished'}
    </li>
  </ul>
  <div>
     <MapView address={listing.address} />
  </div>
{currentUser && listing?.userRef !== currentUser._id && !contact && (
  <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
    Contact landlord
  </button>
)}
{contact && <Contact listing={listing}/> }

</div>
       )}
    </main>
  ) 
}

export default Listing
