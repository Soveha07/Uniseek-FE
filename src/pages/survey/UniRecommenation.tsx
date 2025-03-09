import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UniversityRecommendation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [universities, setUniversities] = useState<any[]>([]);

    useEffect(() => {
        const storedUniversities = localStorage.getItem("universities");

        if (location.state?.universities) {
            setUniversities(location.state.universities);
        } else if (storedUniversities) {
            setUniversities(JSON.parse(storedUniversities)); // ✅ Load from localStorage on refresh
        } else {
            navigate('/survey'); // Redirect if no data found
        }
    }, [location.state, navigate]);

    return (
        <div>
            <h1>University List</h1>
            <ul>
                {universities.map((uniObj: any) => {
                    const uni = uniObj.university || uniObj;
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
