const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-slate-800 font-medium leading-relaxed">
      {value}
    </p>
  </div>
);

const ProfileDisplay = ({resturant}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Mini Profile Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center h-fit">
        <img
          src={resturant.image}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-50 mb-4 shadow-md"
          alt="Restaurant"
        />
        <h2 className="text-xl font-bold text-slate-800">{resturant.name}</h2>
        {resturant.is_active?(
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mt-2">
          ACTIVE
        </span>
        ):
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mt-2">
          INACTIVE
        </span>
}


        <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Rating</p>
            <p className="text-lg font-bold text-slate-800">
              {resturant.rating} <span className="text-yellow-400">★</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Orders</p>
            <p className="text-lg font-bold text-slate-800">{resturant.orders}</p>
          </div>
        </div>
      </div>

      {/* Info Details */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            About Restaurant
          </h3>

          <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Street
                  </p>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {resturant.street_name}
                  </p>
                </div> 
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    city
                  </p>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {resturant.city}
                  </p>
                </div> 
                 <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    pincode
                  </p>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {resturant.pincode}
                  </p>
                </div>
            </div>

            {/* <InfoItem
              label="Location"
              value={<span>📍 123 Gastronomy Lane, Downtown Metro</span>}
            /> */}

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Description
            </p>
            <p className="text-slate-800 font-medium leading-relaxed">
              {resturant.description}
            </p>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;

