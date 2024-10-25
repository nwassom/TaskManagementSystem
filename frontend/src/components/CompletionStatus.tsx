import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { updateTask } from '../redux/taskSlice';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../assets/check-mark.svg';

/*
	Returns the completion status of a task

	on task hover able to change task completion status
*/
const CompletionStatus: React.FC = ({}) =>
{	
	const dispatch = useDispatch();

	return (
		<div></div>
	);
};

export default CompletionStatus;