import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const data = await searchUsers(username, location, minRepos, 1);
      setUsers(data.items);
    } catch (err) {
      setError("Looks like we can't find users with those criteria");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const data = await searchUsers(username, location, minRepos, nextPage);
      setUsers((prev) => [...prev, ...data.items]);
    } catch {
      setError("Error loading more users");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-bold">GitHub Advanced User Search</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Minimum Repositories"
          className="w-full border rounded px-3 py-2"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {users.length > 0 && (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-4 border p-4 rounded-lg"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{user.login}</h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        {users.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
