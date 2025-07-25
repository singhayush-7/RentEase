import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-sm sm:text-base leading-relaxed">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">About RentEase</h1>
      
      <p className="text-slate-700 text-lg mb-4">
        Welcome to <span className="font-semibold">RentEase</span>, your trusted partner in finding the perfect place to call home.
        Whether you're looking to rent, buy, or sell, our platform offers a seamless experience designed with simplicity and reliability in mind.
      </p>
      
      <p className="text-slate-700 text-lg mb-4">
        Our mission is to make property discovery smarter and hassle-free. We empower users with verified listings, intuitive filters, and modern design to navigate the real estate world confidently.
      </p>
      
      <p className="text-slate-700 text-lg mb-4">
        Built with the latest technologies including <span className="font-semibold">MongoDB, Express, React, and Node.js</span>, RentEase ensures fast performance, secure operations, and user-friendly interfaces.
      </p>
      
      <p className="text-slate-700 text-lg mb-4">
        Whether you're an owner listing your property or a buyer looking for your next investment — we're here to help every step of the way.
      </p>

      <p className="text-slate-700 text-lg">
        Thank you for choosing <span className="font-semibold">RentEase</span>. Let’s find your dream property today.
      </p>
    </div>
  );
}
