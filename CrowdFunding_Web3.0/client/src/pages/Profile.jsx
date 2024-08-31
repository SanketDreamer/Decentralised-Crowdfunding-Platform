// Profile.js

import React from "react";
import "./Profile.css"; // Import the CSS file
import { Link } from "react-router-dom";
import Web3 from "web3";
const Profile = () => {
  const campaignsCreated = 5;
  const donationsMade = 4;
  const walletBalance = 283200;
  const donationHistory = [
    { amount: 2000, transactionId: "0x87aa6c04d8c33a57a4sda......", date: "2023-11-25" },
    { amount: 1000, transactionId: "0xa2a2799b3dab8fe16865d......", date: "2023-11-24" },
    { amount: 14400, transactionId: "0x87aa6c04d8c33a57a4sda......", date: "2023-11-15" },
    { amount: 1000, transactionId: "0x87aa6c04d8c33a57a4sda......", date: "2023-11-10" },
    
    // Add more donation history objects with transaction details as needed
  ];

  const userData = {
    username: " Arpit1069",
    email: " arpitvidhale08@gmail.com",
    account: " 0x89586655D4F40D164c31fCB7d383369a178a5cA0",
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title"><strong>User Profile</strong></h2>
      <div className="user-details">
        <div className="user-info">
          <p className="rounded-[10px] h-[50px] bg- border border-[#3a3a43] flex items-center  p-2"><strong>Username : </strong> {userData.username}</p>
          <p className="rounded-[10px] h-[50px] bg- border border-[#3a3a43] flex items-center  p-2"><strong>Email : </strong> {userData.email}</p>
          <p className="rounded-[10px] h-[50px] bg- border border-[#3a3a43] flex items-center  p-2"><strong>Account ID : </strong> {userData.account}</p>
        </div>
      </div>
      <div className="user-stats">
        <div className="user-stat">
          <h3><strong>Campaigns Created</strong></h3>
          <p>{campaignsCreated}</p>
        </div>
        <div className="user-stat">
          <h3><strong>Donations Made</strong></h3>
          <p>{donationsMade}</p>
        </div>
        <div className="user-stat">
          <h3><strong>Wallet Balance</strong></h3>
          <p>{walletBalance} ₹</p>
        </div>
      </div>
    <div> <br></br></div>
      <h3><strong>Donation History:</strong></h3>
      <div> <br></br></div>
      <div className="donation-history">
        {donationHistory.map((donation, index) => (
          <div key={index} className="donation-card">
            <div className="donation-details">
              <p><strong>Donation {index + 1}</strong> </p>
              <p><strong>Amount :</strong> {donation.amount} ₹</p>
              <p> <strong>Transaction ID :</strong>{donation.transactionId}</p>
              <p><strong>Date :</strong> {donation.date}</p>
            </div>
          </div>
        ))}
        </div>
        <div> <br></br></div>
      <h3><strong>Upload your Document:</strong></h3>
      <div className="redirect-button">
        <Link to="http://127.0.0.1:5500/index.html" className="button">
          Verify Document
        </Link>
      </div>
    </div>    
  );
};

export default Profile;
