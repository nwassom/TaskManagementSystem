import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';

function App() {
  return (
    <Provider store={store}>
      <div className="App h-screen bg-slate-900">
        <TaskList/>
        <NewTask/>
      </div>
    </Provider>
  );
}

export default App;
