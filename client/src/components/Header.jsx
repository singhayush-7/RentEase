import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
function Header() {
  const { currentUser } = useSelector((state) => state.user);
 
 const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }; 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    
         <header  className="bg-blue-100 py-4 shadow-md w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 w-full md:w-auto">
          <h1 className="text-2xl font-extrabold text-blue-600 text-center md:text-left">Rent<span className="text-black">Ease</span></h1>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-base font-medium text-gray-800">
        <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        {currentUser ? (
  <li>
   <Link
  to="/profile"
  className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8"
>
  <img
    src={currentUser?.avatar || '/default-avatar.png'}
    alt="profile"
    className="w-full h-full rounded-full object-cover border-2 border-blue-400"
  />
</Link>

  </li>
) : (
  <>
    <li><Link to="/signup">SignUp</Link></li>
    <li><Link to="/signin">SignIn</Link></li>
  </>
)}
          </ul>
        </div>
 
       <form    onSubmit={handleSubmit}   className="relative w-full max-w-sm sm:max-w-xs">
  <input
    type="text"
    placeholder="Search"
     value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-4 pr-10 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="submit"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600"
  >
    <FaSearch className='text-slate-600' />
  </button>
  </form> 
      </div>
    </header>
  )
}

export default Header
