import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("Unknown");
  const [phoneNum, setPhoneNum] = useState("099 999 9999");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEdit(!isEdit);

    if (isEdit) {
      alert("Profile successfully updated!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-mysecondary">
      <form
        onSubmit={handleSubmit}
        className="bg-myskyblue rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row"
      >
        <div className="md:w-1/3 w-full bg-myskyblue flex flex-col items-center border-b md:border-b-0 md:border-r p-4">
          <img
            src="/onboarding/google.png"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          {isEdit ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-b2 font-bold mt-3 text-center bg-myskyblue"
            />
          ) : (
            <h2 className="text-b2 font-bold mt-3 bg-myskyblue">{name}</h2>
          )}
          <p className="text-gray-500 bg-myskyblue">Student</p>
        </div>

        <div className="w-full md:w-2/3 p-6 bg-myskyblue flex flex-col items-center">
          <div className="w-full bg-myskyblue max-w-xs flex flex-col space-y-3">
            <label className="border rounded p-2 w-full text-center bg-gray-100">
              {isEdit ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-center outline-none"
                />
              ) : (
                name
              )}
            </label>

            <label className="border rounded p-2 w-full text-center bg-gray-100">
              {isEdit ? (
                <input
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  className="w-full bg-transparent text-center outline-none"
                />
              ) : (
                phoneNum
              )}
            </label>

            <div className="border rounded p-2 w-full text-center bg-gray-100">
              unknown@gmail.com
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-4 gap-3 bg-myskyblue">
            <button
              type="submit"
              className="bg-myprimary text-white rounded px-3 py-3 text-sm w-28 sm:w-32 md:w-36"
            >
              {isEdit ? "Save" : "Edit"} Profile
            </button>

            {!isEdit && (
              <button
                type="button"
                onClick={() => navigate("/userresetpw")}
                className="bg-myprimary text-white rounded px-3 py-3 text-sm w-28 sm:w-32 md:w-36"
              >
                Reset Password
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
