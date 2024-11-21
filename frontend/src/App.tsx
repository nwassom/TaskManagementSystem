import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';
import { Login } from './features/auth/Login';
import { Signup } from './features/auth/Signup';
import Home  from './pages/Home';

const App: React.FC = () => {
  const isLoggedIn = false; // Replace with your actual login check logic (e.g., JWT check)

  return (
    <Provider store={store}>
      <Router>
        <div className="App h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
