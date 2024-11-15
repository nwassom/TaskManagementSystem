import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';
import { Login } from './features/auth/Login';

const App: React.FC = () => {
  const isLoggedIn = false; // Replace with your actual login check logic (e.g., JWT check)

  return (
    <Provider store={store}>
      <Router>
        <div className="App h-screen bg-slate-900">
          <Routes>
{/*             Redirect to home if user is logged in 
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />*/}
            
            {/* Login route */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            
           {/*  Signup route 
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />*/}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
