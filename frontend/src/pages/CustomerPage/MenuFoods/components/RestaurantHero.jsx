import React from 'react';

const StarIcon = () => (
    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.631-.921 1.932 0l1.243 3.823a1 1 0 00.95.691h4.025c.969 0 1.371 1.24.588 1.81l-3.265 2.373a1 1 0 00-.364 1.118l1.243 3.823c.3.921-.755 1.688-1.543 1.118l-3.265-2.373a1 1 0 00-1.176 0l-3.265 2.373c-.788.57-1.843-.197-1.543-1.118l1.243-3.823a1 1 0 00-.364-1.118L2.015 9.251c-.783-.57-.381-1.81.588-1.81h4.025a1 1 0 00.95-.691l1.243-3.823z"></path></svg>
);

const RestaurantHero = ({ data }) => {
  return (
    <section className="mb-8 relative rounded-xl overflow-hidden shadow-xl">
      <img 
        className="w-full h-80 object-cover opacity-80" 
        src={data.image} 
        alt={`${data.name} Restaurant Interior`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex items-end p-8">
        <div className="text-white">
          <h1 className="text-5xl font-extrabold mb-2">{data.name}</h1>
          <p className="text-xl font-medium">{data.description}</p>
          
          <div className="flex items-center space-x-4 mt-3">
            {/* Rating */}
            <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full font-bold text-lg">
              <StarIcon />
              {data.rating}
            </div>
            <span className="text-lg">| {data.street_name} | {data.city} | {data.pincode}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantHero;