import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';

function App() {
  return (
    <div className="App h-screen bg-slate-900">
      <TaskList/>
      <NewTask/>
    </div>
  );
}

export default App;
