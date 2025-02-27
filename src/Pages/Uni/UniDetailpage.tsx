import Header from "../../Components/Header";
import MajorDetailCard from "../../Components/MajorDetailCard";
import UniNameCard from "../../Components/UniNameCard";
import AboutUni from "../../Components/AboutUni";

const UniDetailpage = () => {
  return (
    <div className="">
      <Header title="University Details" />
      <div className="min-h-screen mt-16 relative">
        {/* University Image */}
        <div className="relative w-full h-64 md:h-96 lg:h-96 bg-mysecondary">
          <img
            src="/Assets/UniPics/itc1.png"
            alt="Institute of Technology of Cambodia"
            className="w-full h-full object-cover"
          />

          {/* University Info (Overlapping Card) */}
          <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <UniNameCard
              name="Institute of Technology of Cambodia"
              type="Public School"
              unilogo="\Assets\UniPics\itc_logo.png"
            />
          </div>
        </div>

        {/* About University */}
        <div className="mt-16"> {/* Add margin to avoid overlap */}
          <AboutUni />
        </div>

        {/* Explore Major */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Explore Major</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
            <MajorDetailCard 
              title="Information and Communication Engineering" 
              description="The program of Civil Engineering Department, Faculty of Civil Engineering, was organized to provide knowledge and skill on analysis, design & information for all elements of water planning and cost estimation for construction, and construction of buildings, road, and bridge."
            />
            <MajorDetailCard 
              title="Information and Communication Engineering" 
              description="The program of Civil Engineering Department, Faculty of Civil Engineering, was organized to provide knowledge and skill on analysis, design & information for all elements of water planning and cost estimation for construction, and construction of buildings, road, and bridge."
            />
            <MajorDetailCard 
              title="Information and Communication Engineering" 
              description="The program of Civil Engineering Department, Faculty of Civil Engineering, was organized to provide knowledge and skill on analysis, design & information for all elements of water planning and cost estimation for construction, and construction of buildings, road, and bridge."
            />
            <MajorDetailCard 
              title="Information and Communication Engineering" 
              description="The program of Civil Engineering Department, Faculty of Civil Engineering, was organized to provide knowledge and skill on analysis, design & information for all elements of water planning and cost estimation for construction, and construction of buildings, road, and bridge."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniDetailpage;
