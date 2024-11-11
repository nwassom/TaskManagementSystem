import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './components/task/TaskList';
import NewTask from './components/task/NewTask';

import Login from './components/user/Login';
import Signup from './components/user/Signup';

function App() {
  return (
    <Provider store={store}>
      <div className="App h-screen bg-slate-900">
        <Login/>
      </div>
    </Provider>
  );
}

export default App;
