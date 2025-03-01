import React, { useState, useEffect } from "react";
import Button from "../components/homepage/Button";
import Box from "../components/homepage/Box";
import SmallBox from "../components/homepage/SmallBox";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <>
      <div className="bg-[#DCE6F1] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl text-center bg-myskyblue">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-myskyblue">Explore Universities</h2>

          {/* Search Bar */}
          <div className="p-6 rounded-lg shadow-md bg-myskyblue">
            <form className="flex items-center max-w-lg mx-auto bg-myskyblue" onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search for universities..."
              />
              <button
                type="submit"
                className="ml-3 py-2.5 px-4 text-sm font-medium text-white bg-[#0A66C2] rounded-full hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* University */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <Box
          title="University Ranking 2025"
          description="Discover the top-performing universities in Cambodia"
          imgPath="/homepage/uni.jpeg"
          buttonText="Explore"
          onClick={() => alert("")}
         
        />
        <Box
          title="University Ranking by Subject 2025"
          description="Discover the top-performing universities in Cambodia"
          imgPath="/homepage/major.jpg"
          buttonText="Explore"
          onClick={() => alert("")}
        />
      </div>

      {/* How UniSeek can support u*/}
      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4 mt-10">
        <h1 className="font-bold text-2xl mb-4">How UniSeek can support you?</h1>
        <p className="mb-10">
          We're here to support you through all stages of the university journey; whether it's researching institutions or navigating admissions.
        </p>
      </div>

      {/* support section*/}
      <div className="flex flex-wrap justify-center items-center gap-16">
        <div className="flex flex-col items-center">
          <img className="w-60 h-60 mb-6" src="homepage/unilogo.png" alt="university" />
          <SmallBox
            title="Meet university representatives in person"
            description="Create connections directly with the senior."
            buttonText="Find Your Mentor"
            onClick={() => alert("")}
          />
        </div>

        <ol className="relative hidden sm:block border-l border-gray-200 dark:border-gray-700 flex-col h-full py-10">
          <li className="relative mb-96">
            <div className="absolute w-3 h-3 rounded-full -left-1.5 border border-white dark:bg-myprimary"></div>
          </li>
          <li className="relative">
            <div className="absolute w-3 h-3 rounded-full -left-1.5 border border-white dark:bg-myprimary"></div>
          </li>
        </ol>

        <div className="flex flex-col items-center">
          <SmallBox
            title="Find the right university for you"
            description="Find out which universities excel in your chosen subject"
            buttonText="Find Your University"
            onClick={() => alert("")}
          />
          <img className="w-60 h-60 mt-6" src="homepage/student.png" alt="student" />
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4 mt-20">
        <p className="font-bold mb-4">Want to meet university representatives to learn more about their experience?</p>
        <Button className="bg-myprimary text-white font-bold rounded-full w-96 h-14 mb-9" text="Let's Get Started" />
      </div>
    </>
  );
};

export default Home;
