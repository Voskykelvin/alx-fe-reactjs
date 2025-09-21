import axios from "axios";

const BASE_URL = "https://api.github.com";
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY; // from .env

export const fetchUserRepos = async (username) => {
  try {
    const headers = API_KEY
      ? { Authorization: `token ${API_KEY}` }
      : {};

    const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
};
