import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800 antialiased selection:bg-amber-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navbar (Glassmorphism) */}
      <Navbar/>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full text-amber-600 font-semibold text-sm border border-amber-100/60">
              <i className="fa-solid fa-wand-magic-sparkles"></i> Satisfy your cravings instantly
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Delicious meals, delivered <span className="text-amber-500">straight to your door.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Browse top-rated local restaurants, customize your orders perfectly, and track your food in real-time. Good food is just a click away.
            </p>

            {/* Search Bar Container */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-3 py-2">
                <i className="fa-solid fa-location-dot text-amber-500 text-lg"></i>
                <input 
                  type="text" 
                  placeholder="Enter delivery address..." 
                  className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent font-medium"
                />
              </div>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2">
                <span>Find Food</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </button>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-amber-100/60 p-6">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" 
                alt="Delicious Food" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Glassmorphism Floating Card 1 */}
              <div className="absolute -left-6 top-1/4 p-4 rounded-2xl shadow-xl border border-white/60 bg-white/45 backdrop-blur-md flex items-center gap-3.5 max-w-[200px]">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Super Fast</p>
                  <p className="text-sm font-bold text-slate-800">25 Min Delivery</p>
                </div>
              </div>

              {/* Glassmorphism Floating Card 2 */}
              <div className="absolute -right-6 bottom-12 p-4 rounded-2xl shadow-xl border border-white/60 bg-white/45 backdrop-blur-md flex items-center gap-3.5 max-w-[220px]">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Top Rated</p>
                  <p className="text-sm font-bold text-slate-800">4.9/5 Star Quality</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-slate-100 max-w-7xl mx-auto" />

      {/* Premium Bento Grid Categories Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Explore by Categories</h2>
          <p className="text-slate-500 font-medium">Whatever you're craving, we've got you covered.</p>
        </div>

        {/* Bento Grid Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Large Feature */}
          <Link to="/category/burger" className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-[240px] p-8 flex flex-col justify-between sm:col-span-2 shadow-sm hover:shadow-xl transition-all duration-300">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div className="relative w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <i className="fa-solid fa-hamburger text-amber-400"></i>
            </div>
            <div className="relative">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">Trending</span>
              <h3 className="text-2xl font-bold mt-1">Juicy Burgers</h3>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Over 45 local outlets active now</p>
            </div>
          </Link>

          {/* Card 2: Standard */}
          <Link to="/category/pizza" className="group relative overflow-hidden rounded-3xl bg-slate-100 min-h-[240px] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80')" }}
            ></div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-pizza-slice text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Gourmet Pizzas</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Cheesy perfections</p>
            </div>
          </Link>

          {/* Card 3: Standard */}
          <Link to="/category/healthy" className="group relative overflow-hidden rounded-3xl bg-slate-100 min-h-[240px] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80')" }}
            ></div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-seedling text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Healthy Bowls</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Fresh & low-calorie choices</p>
            </div>
          </Link>

          {/* Card 4: Standard */}
          <Link to="/category/desserts" className="group relative overflow-hidden rounded-3xl bg-slate-100 min-h-[240px] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80')" }}
            ></div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-ice-cream text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Sweet Desserts</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Satisfy your sweet tooth</p>
            </div>
          </Link>

          {/* Card 5: Large Feature */}
          <Link to="/category/asian" className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-[240px] p-8 flex flex-col justify-between sm:col-span-2 shadow-sm hover:shadow-xl transition-all duration-300">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div className="relative w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <i className="fa-solid fa-bowl-rice text-amber-400"></i>
            </div>
            <div className="relative">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">Authentic</span>
              <h3 className="text-2xl font-bold mt-1">Asian Delicacies</h3>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Sushi, ramen, wok-tossed wonders</p>
            </div>
          </Link>

          {/* Card 6: Promotional Highlight */}
          <Link to="/offers" className="group bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl min-h-[240px] p-8 flex flex-col justify-between shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg">
              <i className="fa-solid fa-tags"></i>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold leading-tight">Get Flat 50% Off</h3>
              <p className="text-sm text-amber-100 mt-1 font-medium">On your first 3 food orders</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold bg-white text-amber-600 px-4 py-2 rounded-xl">
                Code: FIRST50
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Craver</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting hungry foodies with premium dining experiences in record breaking time.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
              <Link to="/blog" className="hover:text-white transition-colors">Our Blog</Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-all">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; 2026 Craver Platforms Inc. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
