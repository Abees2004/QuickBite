import React from 'react';
import { Link } from 'react-router';

const RestaurantCard = ({
    id,
    name,
    street_name,
    city,
    pincode,
    min_price,
    rating,
    image
}) => {
    return (
        <Link to= {`/resturant/${id}`} className="restaurant-card block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]">
            <div className="relative h-48 overflow-hidden">
                <img 
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`${name}`}
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full h-full p-4 flex items-end">
                    <span className="text-gray-300 text-lg font-bold">ITEMS AT ₹{min_price.price__min}</span>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl font-bold text-gray-900 truncate">{name}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-bold mb-2">
                    <div className="flex items-center text-green-600">
                        <i className="fa-solid fa-star"></i>
                            {rating}
                    </div>
                    <span className="text-gray-600 font-semibold">• 30-45 Minutes</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{street_name},{city},{pincode}</p>
            </div>
            <div>
                <p className='text-blue-700 mx-3 mb-3'>view details</p>
            </div>
        </Link>
    );
};

export default RestaurantCard;