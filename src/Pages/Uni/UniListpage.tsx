import React from "react";
import Header from "../../Components/Header";
import UniversityCard from "../../Components/UniCard";
import UniversityListLayout from "../../Layouts/UniListLayout";


const universities = [
  {
    name: "Royal University of Phnom Penh",
    priceRange: "$350-$1,200",
    type: "Public School",
    location: "Urban",
    imageUrl: "/Assets/rupp.png",
  },
  {
    name: "Institute of Technology of Cambodia",
    priceRange: "$450-$850",
    type: "Public School",
    location: "Urban",
    imageUrl: "/Assets/itc.png",
  },
  
];

const UniversityList: React.FC = () => {
  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center p-4 ">
       <Header />
      <h2 className= "text-xl font-bold my-6 text-center">Lis of Universities you may need to explore more ...</h2>
      <div className= "mt-10">
      <UniversityListLayout universities= {universities} />
      <button className="mt-4 bg-primary text-white px-6 py-3 rounded-lg">Back Home</button>
      </div>
    </div>

  );
};

export default UniversityList;