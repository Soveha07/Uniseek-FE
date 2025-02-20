import React from "react";
import NavBar from "../layouts/navbar";
import Button from "../components/onboarding/Button";
import Textfield from "../components/onboarding/Textfield";
import Button2 from "../components/onboarding/Button2";
import Box from "../components/onboarding/Box";

const handleClick = () => {
  console.log("Search clicked!");
};

const alertClick = () => {
  alert("Go to Survey!")
}

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="bg-[#DCE6F1] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl text-center bg-[#DCE6F1]">
          <h2 className="bg-[#DCE6F1] text-3xl font-bold text-gray-900 mb-4">Explore Universities</h2>
          
          {/* Search Bar */}
          <div className="bg-[#DCE6F1] p-6 rounded-lg shadow-md">
            <form className="flex items-center max-w-lg mx-auto bg-[#DCE6F1]">  

              <div className="relative w-full bg-[#DCE6F1]">
                {/* Search Icon */}
                {/* <div className="absolute z- inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div> */}

                {/* Search Input */}
                <input 
                  type="text" 
                  id="search" 
                  className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
                  placeholder="Search for universities..." 
                />
              </div>

              <button 
                  type="submit" 
                  className="ml-3 py-2.5 px-4 text-sm font-medium text-white bg-[#0A66C2] rounded-full hover:bg-[#0A66C2] focus:ring-4 focus:outline-none focus:ring-blue-300">                
                Search
              </button>

            </form>
          </div>
        </div>
      </div>
      <br />

      <div className="flex flex-wrap justify-center gap-6">
        <Box
          title="University Ranking 2025"
          description="Discover the top-performing universities in Cambodia"
          imgPath="/onboarding/uni.jpeg"
          buttonText="Explore"
          onButtonClick={handleClick}
        />
        <Box
          title="University Ranking by Subject 2025"
          description="Discover the top-performing universities in Cambodia"
          imgPath="/onboarding/major.jpg"
          buttonText="Explore"
          onButtonClick={handleClick}
        />
      </div>
      <br />
      <br />
      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4">
        <h1 className="font-bold text-2xl mb-4">How UniSeek can support you?</h1>
        <p className="mb-4">We're here to support you through all stages of the university journey; whether its researching institutions or navigating admissions.</p>
        <Button 
          className="text-white bg-myprimary mb-10" 
          text="Let's Get Started" 
          onClick={alertClick}
          />
      </div>
    </>
  );
};

export default Home;
