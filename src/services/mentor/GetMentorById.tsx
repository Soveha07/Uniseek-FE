import axios from "axios";
import { CONFIG } from "../../config";

const API_BASE_URL = CONFIG.API_URL;

export const getMentorById = async (id: number) => {
  try {
    const response = await axios.get<{ data: { data: any } }>(`${API_BASE_URL}/mentors/${id}`);
    return response.data.data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch mentor data"
    );
  }
};
