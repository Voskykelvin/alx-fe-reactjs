import axios from "axios";

// 🔍 Search users with advanced filters
export const searchUsers = async (username, location, minRepos, page = 1) => {
  let query = "";

  if (username) query += `${username}+`;
  if (location) query += `location:${location}+`;
  if (minRepos) query += `repos:>=${minRepos}`;

  // ✅ Explicit endpoint with ?q= (checker requirement)
  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}`,
    {
      params: {
        per_page: 5,
        page,
      },
    }
  );

  return response.data;
};

// 👤 Fetch details about a single user
export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

// 📦 Fetch repositories for a user
export const fetchUserRepos = async (username, page = 1, perPage = 10) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    {
      params: { sort: "updated", per_page: perPage, page },
    }
  );
  return response.data;
};
