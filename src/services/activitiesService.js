import axios from "axios";

const API_URL = "http://localhost:8080/activities";

export const getActivities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
