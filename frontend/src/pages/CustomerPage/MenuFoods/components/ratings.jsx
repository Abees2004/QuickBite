import axios from 'axios';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../api/axiosapi';

const RatingsSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [usersReviews, setUsersReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);

  const fetchAllReviews = async () => {
    try {
      const res = await axiosInstance.get("/api/resturants/restaurant-ratings/1/");
      setUsersReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyReview = async () => {
    try {
      const res = await axios.get("/api/resturants/restaurant-customer-ratings/1/");
      setMyReview(res.data);
      setRating(res.data.rating);
      setComment(res.data.review);
    } catch {
      setMyReview(null);
    }
  };

  useEffect(() => {
    fetchAllReviews();
    fetchMyReview();
  }, []);

  const handlePost = async () => {
    if (!comment.trim()) return;
    try {
      await axiosInstance.post("api/resturants/customer-restaurant-ratings/1/", {
        rating,
        review: comment
      });
      fetchMyReview();
      fetchAllReviews();
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-gray-50/50 min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
        <div>
          <h2 className="text-xl font-black text-slate-800">Reviews</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold"
        >
          {showForm ? "Close" : myReview ? "Edit My Review" : "Rate Us"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-[2rem] shadow space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">How was it?</span>
            <div className="flex text-2xl gap-1">
              {[1,2,3,4,5].map(num => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={num <= rating ? "text-emerald-500" : "text-gray-300"}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="w-full bg-gray-50 rounded-2xl p-4 h-28"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your feedback..."
          />

          <button
            onClick={handlePost}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold"
          >
            {myReview ? "Save Update" : "Post Review"}
          </button>
        </div>
      )}

      {/* MY REVIEW */}
      {myReview?.user && (
        <div className="bg-white p-6 rounded-[2rem] shadow border border-emerald-100 flex gap-4">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold">
            {myReview.user.username[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">
              {myReview.user.username} <span className="text-emerald-500">(You)</span>
            </h4>
            <div className="text-emerald-500 text-xs">
              {"★".repeat(myReview.rating)}
            </div>
            <p className="italic text-gray-600 mt-2">
              "{myReview.review}"
            </p>
          </div>
        </div>
      )}

      {/* OTHER REVIEWS */}
      {usersReviews.map(item => (
        item?.user && item.id !== myReview?.id && (
          <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow flex gap-4">
            <div className="w-12 h-12 bg-slate-800 text-emerald-400 rounded-2xl flex items-center justify-center font-bold">
              {item.user.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{item.user.username}</h4>
              <div className="text-emerald-500 text-xs">
                {"★".repeat(item.rating)}
              </div>
              <p className="italic text-gray-600 mt-2">
                "{item.review}"
              </p>
            </div>
          </div>
        )
      ))}

    </div>
  );
};

export default RatingsSection;