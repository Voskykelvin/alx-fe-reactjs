import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RepoList from "./components/RepoList";
import Search from "/.components/Search";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-lg">
        Github user
        </h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/repos">Repositories</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome to GitHub Explorer</h2>} />
          <Route path="/repos" element={<RepoList />} />
        </Routes>
      </div>
      <Search />
    </Router>
  );
}

export default App;
