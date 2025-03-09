import { useLocation } from 'react-router-dom';

const UniversityRecommendation: React.FC = () => {
    const location = useLocation();
    const universities = location.state?.universities || []; // Retrieve data

    return (
        <div>
            <h1>University List</h1>
            <ul>
                {universities.map((uniObj: any) => {
                    const uni = uniObj.university; // Extract `university` from object
                    return (
                        <li key={uni.id}>
                            <h2>{uni.name}</h2>
                            <p>{uni.description}</p>
                            <p>Location: {uni.location}</p>
                            <p>Scholarships: {uni.scholarship}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UniversityRecommendation;

