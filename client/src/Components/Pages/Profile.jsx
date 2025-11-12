import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../../config.js";
import Loader from "../Loader.jsx";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { logout } = useContext(AuthContext);


  // Fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile!");
      navigate("/signin", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true });
    } else {
      fetchUserData();
    }
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const { data } = await axios.put(
      `${serverUrl}api/user/update/${user._id}`,  
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
      toast.success("Profile updated successfully!");
      setUser(data.user); // update  new data
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  //for logout button
  const ConfirmModal = ({ message, onConfirm, onCancel }) => ( 
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
  <div className="bg-white p-6 rounded-xl shadow-lg w-80 max-w-sm"> 
    <p className="text-gray-700 mb-4">{message}</p> 
  <div className="flex justify-end gap-3"> 
    <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400" > Cancel 
    </button> 
    
   <button
          onClick={() => {
            logout(); // ✅ Use context logout only
            toast.success("Logged out successfully!");
            navigate("/signin", { replace: true });
          }}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>
  </div> 
  </div> 
  </div> 
);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {/* Left Section */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Welcome Card */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Welcome back, {user?.name || "User"}!
              </h2>
              <p className="text-gray-500 text-sm">
                Manage your account and preferences
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <div className="text-xl font-bold">
              <IoLogOutOutline />
            </div>
            <h1>Logout</h1>
          </button>
        </div>

        {/* Profile Information */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Profile Information</h3>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {/* Editable Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <ProfileField
              label="Full Name"
              name="name"
              value={formData.name}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Email Address"
              name="email"
              value={formData.email}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Address"
              name="address"
              value={formData.address}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <hr className="my-4" />

          {/* Account Info */}
          <h3 className="font-semibold text-lg mb-3">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard
              icon="📅"
              title="Member since"
              value={new Date(user?.createdAt).toLocaleDateString()}
            />
            <InfoCard icon="⚙️" title="Account Type" value="User" />
          </div>
        </div>
      </div>

      {/* Right Sidebar (same as before) */}
      <div className="flex flex-col gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <ActionButton
              to={"/cart"}
              label="Shopping Cart"
              desc="4 items in cart"
              icon="🛒"
            />
            <ActionButton to={"/order"} label="My Orders" desc="View order history" icon="📦" />
            <ActionButton to={"/wishlist"} label="Wishlist" desc="Saved items" icon="❤️" />
            <ActionButton to={"/shop"} label="Shop Now" desc="Browse products" icon="🛍️" />
          </div>
        </div>
        {showLogoutModal && ( <ConfirmModal message="Are you sure you want to log out?" onConfirm={() => { localStorage.removeItem("token"); navigate("/signin"); }} onCancel={() => setShowLogoutModal(false)} /> )}
      </div>
    </div>
  );
};

// ✅ ProfileField Component (Editable)
const ProfileField = ({ label, name, value, isEditing, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 text-gray-700"
      />
    ) : (
      <input
        type="text"
        value={value}
        disabled
        className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
      />
    )}
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ label, desc, icon, to }) => (
  <Link
    to={to || "#"}
    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 w-full text-left"
  >
    <span className="text-xl">{icon}</span>
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </Link>
);

export default Profile;
