import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskList from '../components/task/TaskList';
import NewTask from '../components/task/NewTask';
import LogoutButton from '../components/LogoutButton';
import { useAuthNavigation } from '../utils/useAuthNavigation';

const Home: React.FC = () => {
    useAuthNavigation();

    return (
        <div>
            <TaskList/>
            <NewTask/>
            <LogoutButton/>
        </div>
    );
};

export default Home;