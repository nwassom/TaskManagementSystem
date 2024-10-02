import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App h-screen bg-slate-900">
      <TaskList/>
    </div>
  );
}

export default App;
