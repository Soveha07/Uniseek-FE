import React, { useState } from "react";
import Header from "../../Components/Header";

const ProfileEdit = () => {
  const [user, setUser] = useState({
    name: "Sorn Aly",
    email: "sornaly256@gmail.com",
    phone: "0975622456",
    profileImage: "/Assets/Profiles/profile1.png",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-mysecondary">
      <Header title="My Profile" />
      <div className="bg-myskyblue rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row">
        
        
        <div className="bg-myskyblue md:w-1/3 w-full flex flex-col items-center border-b md:border-b-0 md:border-r p-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-b2 font-bold mt-3 bg-myskyblue">{user.name}</h2>
          <p className="text-gray-500 bg-myskyblue">Student</p>
        </div>

        
        <div className="bg-myskyblue w-full md:w-2/3 p-6 flex flex-col items-center justify-center">

          {/* Form */}
          <div className="w-full max-w-xs flex flex-col items-center bg-myskyblue space-y-3">
            <input
              type="text"
              value={user.name}
              className="border rounded p-2 w-full text-center"
            />
            <input
              type="text"
              value={user.phone}
              className="border rounded p-2 w-full text-center"
            />
            <input
              type="email"
              value={user.email}
              className="border rounded p-2 w-full text-center"
            />
          </div>

          
          <div className="flex justify-center mt-4">
            <button className="bg-myprimary text-white px-4 py-2 rounded w-full max-w-xs">
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
