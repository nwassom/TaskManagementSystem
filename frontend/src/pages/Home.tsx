import React, {useState, useEffect } from 'react';

import TaskList from '../components/task/TaskList';
import NewTask from '../components/task/NewTask';

const Home: React.FC = () => {

    return (
        <div>
            <TaskList/>
            <NewTask/>
        </div>
    );
};

export default Home;