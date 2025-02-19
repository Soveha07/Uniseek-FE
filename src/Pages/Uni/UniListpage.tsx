import React, {useState} from "react";
import Header from "../../Components/Header";
import UniversityCard from "../../Components/UniCard";
import UniversityListLayout from "../../layouts/UniListLayout";


const universities = [
  {
    name: "Royal University of Phnom Penh",
    priceRange: "$350-$1,200",
    type: "Public School",
    location: "Urban",
    imageUrl: "/Assets/UniPics/rupp.png",
  },
  {
    name: "Institute of Technology of Cambodia",
    priceRange: "$450-$850",
    type: "Public School",
    location: "Urban",
    imageUrl: "/Assets/UniPics/itc.png",
  },
  
];

const UniversityList: React.FC = () => {
const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  return (
    <div className="bg-mysecondary min-h-screen flex flex-col items-center p-4 my-10">
       <Header/>
      <h2 className= "text-b1 font-bold my-6 text-center">List of Universities you may need to explore more ...</h2>
      <div className="flex flex-col items-start w-full max-w-lg mb-6">
        <label className="ml-6 text-b2 font-Meduim mb-2">School Type :</label>
        <div className="flex gap-2">
          {["Public", "Private"].map((type) => (
            <button
              key={type}
              className={`ml-6 px-4 py-2 rounded-md border text-white ${
                selectedSchool === type ? "bg-myprimary" : "bg-myprimary"
              }`}
              onClick={() => setSelectedSchool(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div> 
      <div className= "mt-10">
      <UniversityListLayout universities= {universities} />
      <button className="mt-4 bg-myprimary text-white px-6 py-3 rounded-lg">Back Home</button>
      </div>
    </div>

  );
};

export default UniversityList;