/*
    Model for User
*/

import Task from './Task';

interface User
{
    id?: number;
    username: string;
    password: string;
    email: string;
    name: string;
    createdAt?: string;
    tasks?: Task[];
}

export default User;
