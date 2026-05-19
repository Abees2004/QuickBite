import React, { useRef, useState } from 'react';

const FilterSidebar = ({ isOpen, onClose, onApply }) => {

const [price,setPrice]=useState(100)

  const ratingRef = useRef(null);
  const vegRef = useRef(null);
  const nonVegRef = useRef(null);
  const priceRef = useRef(null);

  
  const applyFilters = () => {
    const filters = {
      min_rating:parseFloat( ratingRef.current?.value),
    //   diet:
    //     vegRef.current.checked && nonVegRef.current.checked
    //       ? null
    //       : vegRef.current.checked
    //       ? "veg"
    //       : nonVegRef.current.checked
    //       ? "nonveg"
    //       : null,
      min_price: parseFloat(price),
    };
    Object.keys(filters).forEach(
      key => !filters[key] && delete filters[key]
    );

    onApply(filters); 
    onClose();
  };



    const sidebarClasses = `fixed top-0 left-0 w-64 bg-white h-full shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
    } ${
        isOpen ? '' : 'hidden'
    }`;

    const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
        isOpen ? '' : 'hidden'
    }`;

    return (
        <>
            <div className={overlayClasses} onClick={onClose}></div>
            
            <aside id="filter-sidebar" className={sidebarClasses}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-orange-600">Filters</h3>
                        <button id="close-filter-btn" className="text-gray-500 hover:text-gray-900" onClick={onClose}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    
<div className="space-y-2">
  {/* Rating */}
  <div>
    <h4 className="font-semibold text-lg mb-3 border-b pb-2">Rating</h4>
    <div className="space-y-2">
      <label className="flex items-center">
        <input type="radio" name="rating" value="0.0" ref={ratingRef} />
        <span className="ml-2">0.0+</span>
      </label>
      <label className="flex items-center">
        <input type="radio" name="rating" value="4.5" />
        <span className="ml-2">4.5+</span>
      </label>
      <label className="flex items-center">
        <input type="radio" name="rating" value="3.5" />
        <span className="ml-2">3.5+</span>
      </label>
      <label className="flex items-center">
        <input type="radio" name="rating" value="2.5" />
        <span className="ml-2">2.5+</span>
      </label>
    </div>
  </div>

  {/* Dietary */}
  <div className="py-2">
    <h4 className="font-semibold text-lg mb-3 border-b pb-2">Dietary</h4>
    <label className="flex items-center">
      <input type="checkbox" ref={vegRef} />
      <span className="ml-2">Pure Veg</span>
    </label>
    <label className="flex items-center">
      <input type="checkbox" ref={nonVegRef} />
      <span className="ml-2">Non-Veg</span>
    </label>
  </div>

  {/* Price */}
  <div className="py-2">
    <h4 className="font-semibold text-lg mb-3 border-b pb-2">Price Range</h4>
    <input
    type="range"
    min="100"
    max="1000"
    step={50}
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    />
    <span>₹ {price}</span>
  </div>

  <button
    onClick={applyFilters}
    className="w-full py-2 mt-4 bg-orange-600 text-white rounded-lg"
  >
    Apply Filters
  </button>
</div>

                </div>
            </aside>
        </>
    );
};

export default FilterSidebar;