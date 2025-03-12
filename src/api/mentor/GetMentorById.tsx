import axios from "axios";

const API_URL = "http://localhost:3008/mentors";

export const getMentorById = async (id: number) => {
  try {
    const response = await axios.get<{ data: { data: any } }>(`${API_URL}/${id}`);
    return response.data.data.data; 
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch mentor data"
    );
  }
};
