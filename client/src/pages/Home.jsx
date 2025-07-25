 import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import ListingItem from '../components/ListingItem'

 

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings()
    fetchRentListings()
    fetchSaleListings()
  }, [])

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-white py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Welcome to <span className="text-blue-600">Rent</span>
            <span className="text-black">Ease</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Discover the best rental properties and make your move with confidence.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/search"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Browse Listings
            </a>
            <a
              href="/createlisting"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-50 transition"
            >
              List Your Property
            </a>
          </div>
        </div>
      </div>

    {/* Swiper Slider */}
{offerListings.length > 0 && (
  <Swiper navigation modules={[Navigation]}>
    {offerListings.map((listing) => (
      <SwiperSlide key={listing._id}>
        <div
          style={{
            background: `url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          className="h-64 sm:h-80 md:h-[500px] w-full"
        ></div>
      </SwiperSlide>
    ))}
  </Swiper>
)}


      {/* Listings Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 my-10">
        {offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link to="/search?offer=true" className="text-sm text-blue-800 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
              <Link to="/search?type=rent" className="text-sm text-blue-800 hover:underline">
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
              <Link to="/search?type=sale" className="text-sm text-blue-800 hover:underline">
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
