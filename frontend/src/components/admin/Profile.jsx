import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar"; // ✅ Import Sidebar
import "./styles/Profile.css";
// ✅ If you have custom sidebar styles

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    cardNumber: "",
    expiryDate: ""
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(user => user?.email === loggedInEmail);

    if (currentUser) {
      setUserData(currentUser);
      setFormData({
        fullName: currentUser.fullName || "",
        phoneNumber: currentUser.phoneNumber || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        cardNumber: currentUser.cardNumber || "",
        expiryDate: currentUser.expiryDate || ""
      });
    } else {
      setNotFound(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!userData?.email) {
      alert("User not found. Cannot save.");
      return;
    }

    const updatedUsers = users.map(user =>
      user?.email === userData.email
        ? { ...user, ...formData }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Changes saved successfully!");
  };

  if (notFound) {
    return <div className="text-center p-4 text-red-600">User not found. Please log in again.</div>;
  }

  if (!userData) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">{userData.fullName?.charAt(0)?.toUpperCase() || "U"}</div>
          <div>
            <h2>{userData.fullName || "User"}</h2>
            <p>Customer Account</p>
          </div>
        </div>

        <div className="tabs">
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
          <button className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>Security</button>
          <button className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>Payment Methods</button>
        </div>

        {activeTab === "profile" && (
          <div className="tab-content">
            <h3>Profile Information</h3>
            <p>Update your personal and contact details.</p>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} disabled />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="tab-content">
            <h3>Security Settings</h3>
            <p>Change your password here.</p>
            <input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleChange} />
            <button onClick={handleSaveChanges}>Update Password</button>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="tab-content">
            <h3>Payment Methods</h3>
            <p>Update your card information.</p>
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
            <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={formData.expiryDate} onChange={handleChange} />
            <button onClick={handleSaveChanges}>Update Payment Method</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
