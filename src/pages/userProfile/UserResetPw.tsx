import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserResetPw: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full mt-10 items-center justify-center h-auto bg-mysecondary">
      <div className="bg-myskyblue rounded-2xl w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 shadow-lg">
        <h1 className="text-2xl bg-myskyblue font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-gray-500 bg-myskyblue mb-6 text-center">Please set a new password</p>


        <div className="flex flex-col gap-5 bg-myskyblue">
          <div className="flex flex-col bg-myskyblue">
            <label htmlFor="password" className="font-medium mb-2 bg-myskyblue">
              Previou Password:
            </label>
            <div className="relative bg-myskyblue">
              <input
                type={showPassword ? "text" : "password"}
                id="previouspassword"
                className="rounded-md border border-gray-300  p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Previous Password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />} */}
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-myskyblue">
            <label htmlFor="password" className="font-medium mb-2 bg-myskyblue">
              New Password:
            </label>
            <div className="relative bg-myskyblue">
              <input
                type={showPassword ? "text" : "password"}
                id="newpassword"
                className="rounded-md border border-gray-300  p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="New Password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />} */}
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-myskyblue">
            <label htmlFor="password" className="font-medium mb-2 bg-myskyblue">
              Confirm Password:
            </label>
            <div className="relative bg-myskyblue">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                className="rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Confrim Password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />} */}
              </button>
            </div>
          </div>


          <div className="flex justify-center bg-myskyblue">
            <button
              type="submit"
              className="bg-myprimary text-white w-48 py-3 rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>

          <div className="flex justify-baseline text-sm bg-myskyblue">
            <button 
              className="text-[#284BAD] ml-1 hover:underline bg-myskyblue"
              onClick={() => navigate("/userprofile")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResetPw;
