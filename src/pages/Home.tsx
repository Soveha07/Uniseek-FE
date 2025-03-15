import React, { useState } from "react";
import Button from "../components/homepage/Button";
import Box from "../components/homepage/Box";
import SmallBox from "../components/homepage/SmallBox";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import characters from "./characters.json";

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);

  const fuse = new Fuse(characters, {
    keys: ['name', 'location', 'thumb'],
    includeScore: true,
    threshold: 0.3,
  });
  const results = fuse.search(query);
  const charactersResult = results.map(result => result.item);

  const handleOnSearch = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    setQuery(value);
    setModal(value.trim() !== "");
  };

  const closeModal = () => setModal(false);
  const navigate = useNavigate();


  return (
    <>
      <div className="bg-[#DCE6F1] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl text-center bg-myskyblue">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-myskyblue">Explore Universities</h2>

          {/* Search Bar */}
          <div className="p-6 rounded-lg shadow-md bg-myskyblue">
            <form
              className="flex items-center max-w-lg mx-auto bg-myskyblue relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={query}
                onChange={handleOnSearch}
                className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search for universities..."
              />
              <button
                type="submit"
                className="ml-3 py-2.5 px-4 text-sm font-medium text-white bg-[#0A66C2] rounded-full hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Search
              </button>

              {query && (
                <ul className="absolute top-full left-0 w-full hover:bg-myskyblue bg-white border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto rounded-lg">
                  {charactersResult.length > 0 ? (
                    charactersResult.map((character) => (
                      <li 
                        key={character.name} 
                        className="p-3 hover:bg-myskyblue cursor-pointer flex items-center gap-4 transition duration-200 ease-in-out" 
                        onClick={() => navigate(`/universities/detail/${character.id}`)}
                      >

                        <img src={character.thumb} alt={character.name} className="w-10 h-10 rounded-full shadow-md" />
                        <div className="">
                          <strong className="text-lg block text-gray-800">{character.name}</strong>
                          <span className="flex justify-start text-sm text-gray-600">📍 {character.location}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No results found</li>
                  )}
                </ul>
              )}
            </form>
          </div>
        </div>
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
            onClick={() => navigate('/mentors')}
          />
        </div>

        <ol className="relative hidden sm:block border-l border-gray-700 flex-col h-full py-10">
          <li className="relative mb-96">
            <div className="absolute w-3 h-3 rounded-full -left-1.5 bg-myprimary"></div>
          </li>
          <li className="relative">
            <div className="absolute w-3 h-3 rounded-full -left-1.5 border bg-myprimary"></div>
          </li>
        </ol>

        <div className="flex flex-col items-center">
          <SmallBox
            title="Find the right university for you"
            description="Find out which universities excel in your chosen subject"
            buttonText="Find Your University"
            onClick={() => navigate('/universities')}
          />
          <img className="w-60 h-60 mt-6" src="homepage/student.png" alt="student" />
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4 mt-20">
        <p className="font-bold mb-4">Not sure which university is the right fit for you? Take our quick survey to discover your perfect match!</p>
        <Button className="bg-myprimary text-white font-bold rounded-full w-96 h-14 mb-9" text="Let's Get Started" onClick={() => navigate('/survey')} />
      </div>


      {/* University */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6">
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
    </>
  );
};

export default Home;
