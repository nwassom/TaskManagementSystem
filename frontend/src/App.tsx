import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';
import { Login } from './features/auth/Login';
import { Signup } from './features/auth/Signup';

const App: React.FC = () => {
  const isLoggedIn = false; // Replace with your actual login check logic (e.g., JWT check)

  return (
    <Provider store={store}>
      <Router>
        <div className="App h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Signup /> : <Navigate to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
