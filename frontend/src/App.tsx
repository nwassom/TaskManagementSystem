import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';
import { Login } from './features/auth/Login';
import { Signup } from './features/auth/Signup';
import Home  from './pages/Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
