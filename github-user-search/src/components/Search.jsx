import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setSelectedUser(null);

    try {
      const data = await searchUsers(username, location, minRepos);
      setUsers(data.items);
    } catch {
      setError("Could not fetch users. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (login) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUserData(login); 
      setSelectedUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Results using .map() */}
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.login)}>
            <img src={user.avatar_url} alt={user.login} width="50" />
            <span>{user.login}</span>{" "}
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </li>
        ))}
      </ul>

      {/* ✅ Selected user details */}
      {selectedUser && (
        <div>
          <h2>{selectedUser.name || selectedUser.login}</h2>
          <p>{selectedUser.bio || "No bio available"}</p>
          <p>Followers: {selectedUser.followers}</p>
          <p>Following: {selectedUser.following}</p>
          <p>Public Repos: {selectedUser.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
