// src/App.jsx
import './App.css';

import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

import Counter from './components/Counter';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <>
      {/* User Context Example */}
      <div>
        <UserContext.Provider value={userData}>
          <ProfilePage />
        </UserContext.Provider>
        <WelcomeMessage />
      </div>

      {/* Main Layout */}
      <div>
        <Header />
        <MainContent />
        <UserProfile 
          name="Alice" 
          age="25" 
          bio="Loves hiking and photography" 
        />
        <Footer />
      </div>

      {/* Counter Example */}
      <div>
        <h2>Counter Example</h2>
        <Counter />
      </div>
    </>
  );
}

export default App;
