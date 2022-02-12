import { Request, Response } from 'express';
import * as Tasks from '../models/task';

const getAllTasks = async (req: Request, res: Response) => {
    try{
        let tasks = await Tasks.getTasks();
        return res.json({tasks: tasks});
    }catch(error){
        console.error('Error getAllTasks ::', error);
        return res.status(500).json({error: 'Something went wrong!'});
    }
};

const getSingleTask = async (req: Request, res: Response) => {
    if(!req.params.taskId){
        return res.status(400).json({error: 'Task Id not found'});
    }else{
        let taskId = req.params.taskId || '';
        if(taskId.length == 0){
            return res.status(400).json({error: 'Incorrect value of Task Id provided'});
        }else{
            try{
                let task = await Tasks.getTasks(taskId as string);
                return res.json({task: task[0]});
            }catch(error){
                console.error('Error getSingleTask ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
            
        }
    }
};

const createTask = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('title') && inputData.hasOwnProperty('description')){
        if(inputData['title'].length > 0 && inputData['description'].length > 0){
            try{
                let resp = await Tasks.createTask(inputData);
                return res.json({message: 'Task created successfully'});
            }catch(error){
                console.error('Error createTask ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }else{
            return res.status(400).json({error: 'Title and description must be atleast 1 character'});    
        }
    }else{
        return res.status(400).json({error: 'Title or description missing'});
    }
};

const updatedTask = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('title') && inputData.hasOwnProperty('description') && inputData.hasOwnProperty('taskId')){
        if(inputData['taskId'].length == 0){
            return res.status(400).json({error: 'Task Id is missing'});
        }else if(inputData['title'].length == 0 || inputData['description'].length == 0){
            return res.status(400).json({error: 'Title, description must be atleast 1 character'});
        }else{
            try{
                let resp = await Tasks.updateTask(inputData);
                return res.json({message: 'Task updated successfully'});
            }catch(error){
                console.error('Error updatedTask ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }
    }else{
        return res.status(400).json({error: 'Title, description or taskId missing'});
    }
};

const deleteTask = async (req: Request, res: Response) => {
    let taskId = req.body['taskId'];
    if(!taskId || taskId.length == 0){
        return res.status(400).json({error: 'Task Id is missing'});
    }else{
        try{
            let resp = await Tasks.removeTask(taskId);
            return res.json({message: 'Task deleted successfully'});
        }catch(error){
            console.error('Error deleteTask ::', error);
            return res.status(500).json({error: 'Something went wrong!'});
        }
    }
};

export { getAllTasks, getSingleTask, createTask, updatedTask, deleteTask };