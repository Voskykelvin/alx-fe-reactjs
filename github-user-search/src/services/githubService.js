import axios from "axios";

const BASE_URL = "https://api.github.com";

// 🔍 Search for users with advanced filters
export const searchUsers = async (username, location, minRepos, page = 1) => {
  let query = "";

  if (username) query += `${username}+`;
  if (location) query += `location:${location}+`;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: { q: query, per_page: 5, page },
  });

  return response.data;
};

// 👤 Fetch details about a single user
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 📦 Fetch repositories for a single user
export const fetchUserRepos = async (username, page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
      params: { sort: "updated", per_page: perPage, page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
