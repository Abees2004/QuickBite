import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosapi";
import { toast } from "react-toastify";

const EditProfileTab = ({ refresh }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    phno: "",
    image: null,
  });

  // ---------------- FETCH PROFILE ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);

        const res = await axiosInstance.get("/api/users/user-profile/");

        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          bio: res.data.bio || "",
          phno: res.data.phno || "",
          image: null,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.phno.trim()) newErrors.phno = "Phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("bio", formData.bio);
      payload.append("phno", formData.phno);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axiosInstance.patch(
        "/api/users/user-profile/",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Profile updated successfully");

      if (refresh) refresh((prev) => !prev);
    } catch (err) {
      console.error(err);

      if (err.response) {
        const data = err.response.data;

        if (typeof data === "object") {
          setErrors(data);
        } else {
          alert(data?.message || "Update failed");
        }
      } else if (err.request) {
        toast.error("No response from server");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="animate-fade-in">
      <form className="space-y-8 max-w-2xl" onSubmit={handleSubmit}>

        {/* USERNAME */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 uppercase">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border-b py-2"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* IMAGE */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 uppercase">
            Profile Image
          </label>
          <input type="file" onChange={handleImage} />
        </div>

        {/* EMAIL + PHONE */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-400 uppercase">
              Phone
            </label>
            <input
              name="phno"
              value={formData.phno}
              onChange={handleChange}
              className="border-b py-2"
            />
            {errors.phno && (
              <p className="text-red-500 text-sm">{errors.phno}</p>
            )}
          </div>

        </div>

        {/* BIO */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 uppercase">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border-b py-2"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`px-10 py-4 rounded-xl font-bold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:brightness-110"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default EditProfileTab;