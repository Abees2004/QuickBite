import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../ReduxStore/authSlice";
import { useDispatch } from "react-redux";


const Sidebar = ({ activeTab, setActiveTab, user }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const menuItems = [
    {
      type: "tab",
      id: "overview",
      label: "Overview",
      icon: "fa-solid fa-table-cells"
    },
    {
      type: "tab",
      id: "edit",
      label: "Edit Profile",
      icon: "fa-solid fa-pen"
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout())
    navigate("/login");
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl rounded-2xl p-6 flex flex-col justify-between h-full">

        <div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={user?.image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-3 font-bold text-lg">{user?.username}</h3>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>

          <div className="space-y-2">

            {menuItems.map((item, index) => {

              if (item.type === "tab") {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition font-medium
                    ${
                      activeTab === item.id
                        ? "bg-orange-500 text-white"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <i className={item.icon}></i>
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition font-medium hover:bg-slate-100 text-slate-700"
                >
                  <i className={item.icon}></i>
                  {item.label}
                </Link>
              );

            })}

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-5 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Sidebar;