import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../../../../ReduxStore/cartSlice';
import axiosInstance from '../../../../api/axiosapi';

const CartItem = ({ items, setrefresh }) => {
  const dispatch = useDispatch();
  const [error,setError]=useState()

  return (
    <div className="flex py-8 border-b border-gray-100 items-center justify-between">
      <div className="flex items-center gap-6">
        <img
          src={items.food.image}
          className="w-20 h-20 rounded-xl object-cover bg-gray-100"
          alt={items.food.name}
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{items.food.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{items.food.name}</p>
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => {
                axiosInstance
                  .delete(`/api/cart/cart-food-remove/${items.id}/`)
                  .then(res => {
                    setrefresh(refresh => !refresh);
                    dispatch(fetchCartItems());
                  })
                  .catch(err => console.log(err));
              }}
              className="text-xs font-bold text-gray-400 hover:text-black"
            >
              Remove
            </button>
            <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="font-bold text-lg">${(items.quantity * items.food.price).toFixed(2)}</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              if (items.quantity === 1) {
                if (window.confirm("Do you want to remove this item from the cart?")) {
                  axiosInstance
                    .delete(`/api/cart/cart-food-remove/${items.id}/`)
                    .then(res => {
                      setrefresh(refresh => !refresh);
                      dispatch(fetchCartItems());
                    })
                    .catch(err => console.log(err));
                }
                return;
              }
              axiosInstance
                .patch(`/api/cart/cart-food-quantity-decrease/${items.id}/`)
                .then(() => setrefresh(refresh => !refresh))
                .catch(err => console.log(err));
            }}
            className="px-3 py-1 hover:bg-gray-50 text-gray-500"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-bold border-x border-gray-200">{items.quantity}</span>
          <button
            onClick={() =>
              axiosInstance
                .patch(`/api/cart/cart-food-quantity-increase/${items.id}/`)
                .then(res => setrefresh(refresh => !refresh))
                .catch(err => console.log(err))
            }
            className="px-3 py-1 hover:bg-gray-50 text-gray-500"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;















// import axios from 'axios';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchCartItems } from '../../../../ReduxStore/cartSlice';

// const CartItem = ({ items, setrefresh }) => {

//   const dispatch = useDispatch();

//   const [error, setError] = useState('');

//   const handleError = err => {
//     console.log(err.response?.data);

//     setError(
//       err.response?.data?.detail ||
//       'Something went wrong'
//     );
//   };

//   return (
//     <div className="flex py-8 border-b border-gray-100 items-center justify-between">

//       <div className="flex items-center gap-6">

//         <img
//           src={items.food.image}
//           className="w-20 h-20 rounded-xl object-cover bg-gray-100"
//           alt={items.food.name}
//         />

//         <div>

//           <h3 className="font-bold text-lg text-gray-800">
//             {items.food.name}
//           </h3>

//           <p className="text-sm text-gray-400 mt-1">
//             {items.food.name}
//           </p>

//           {error && (
//             <p className="text-red-500 text-sm mt-1">
//               {error}
//             </p>
//           )}

//           <div className="flex items-center gap-4 mt-3">

//             <button
//               onClick={() => {
//                 axios
//                   .delete(
//                     `http://127.0.0.1:8000/api/cart/cart-food-remove/${items.id}/`
//                   )
//                   .then(() => {
//                     setrefresh(r => !r);
//                     dispatch(fetchCartItems());
//                     setError('');
//                   })
//                   .catch(handleError);
//               }}
//               className="text-xs font-bold text-gray-400 hover:text-black"
//             >
//               Remove
//             </button>

//             <div className="h-1 w-1 bg-gray-200 rounded-full"></div>

//           </div>

//         </div>

//       </div>

//       <div className="flex flex-col items-end gap-3">

//         <span className="font-bold text-lg">
//           ${(items.quantity * items.food.price).toFixed(2)}
//         </span>

//         <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

//           {/* MINUS */}
//           <button
//             onClick={() => {

//               if (items.quantity === 1) {

//                 if (
//                   window.confirm(
//                     'Do you want to remove this item from the cart?'
//                   )
//                 ) {

//                   axios
//                     .delete(
//                       `http://127.0.0.1:8000/api/cart/cart-food-remove/${items.id}/`
//                     )
//                     .then(() => {
//                       setrefresh(r => !r);
//                       dispatch(fetchCartItems());
//                       setError('');
//                     })
//                     .catch(handleError);
//                 }

//                 return;
//               }

//               axios
//                 .put(
//                   `http://127.0.0.1:8000/api/cart/cart-food-quantity-decrease/${items.id}/`
//                 )
//                 .then(() => {
//                   setrefresh(r => !r);
//                   setError('');
//                 })
//                 .catch(handleError);
//             }}
//             className="px-3 py-1 hover:bg-gray-50 text-gray-500"
//           >
//             -
//           </button>

//           <span className="px-3 py-1 text-sm font-bold border-x border-gray-200">
//             {items.quantity}
//           </span>

//           {/* PLUS */}
//           <button
//             onClick={() =>
//               axios
//                 .put(
//                   `http://127.0.0.1:8000/api/cart/cart-food-quantity-increase/${items.id}/`
//                 )
//                 .then(() => {
//                   setrefresh(r => !r);
//                   setError('');
//                 })
//                 .catch(handleError)
//             }
//             className="px-3 py-1 hover:bg-gray-50 text-gray-500"
//           >
//             +
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default CartItem;