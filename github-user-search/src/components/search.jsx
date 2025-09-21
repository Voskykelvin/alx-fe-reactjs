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
    } catch {
      setError("😕 No users found. Try adjusting your search criteria.");
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
      setError("⚠️ Error loading more users.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          🔍 GitHub Advanced User Search
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Repositories"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-8">
        {loading && (
          <p className="text-blue-600 font-medium text-center">Loading...</p>
        )}

        {error && <p className="text-red-500 font-medium text-center">{error}</p>}

        {users.length > 0 && (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-4 bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {user.login}
                  </h3>
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
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
