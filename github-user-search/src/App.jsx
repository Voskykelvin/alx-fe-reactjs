import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RepoList from "./components/RepoList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/repos">Repositories</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome to GitHub Explorer</h2>} />
          <Route path="/repos" element={<RepoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
