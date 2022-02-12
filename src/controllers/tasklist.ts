import { Request, Response } from 'express';
import * as Tasklist from '../models/tasklist';
import * as TasklistMap from '../models/tasklistMap';

const getAllTaskLists = async (req: Request, res: Response) => {
    try{
        let tasklists = await Tasklist.getTasklists();
        return res.json({tasklists: tasklists});
    }catch(error){
        console.error('Error createTaskList ::', error);
        return res.status(500).json({error: 'Something went wrong!'});
    }
};

const getSingleTasklist = async (req: Request, res: Response) => {
    if(!req.params.tasklistId){
        return res.status(400).json({error: 'Task Id not found'});
    }else{
        let tasklistId = req.params.tasklistId || '';
        if(tasklistId.length == 0){
            return res.status(400).json({error: 'Incorrect value of Task Id provided'});
        }else{
            try{
                let tasklist = await Tasklist.getTasklists(tasklistId as string);
                return res.json({tasklist: tasklist[0]});
            }catch(error){
                console.error('Error createTaskList ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }
    }
};

const createTaskList = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('title') && inputData.hasOwnProperty('description')){
        if(inputData['title'].length > 0 && inputData['description'].length > 0){
            try{
                let resp = await Tasklist.createTasklist(inputData);
                return res.json({message: 'Tasklist created successfully'});
            }catch(error){
                console.error('Error createTaskList ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }else{
            return res.status(400).json({error: 'Title and description must be atleast 1 character'});    
        }
    }else{
        return res.status(400).json({error: 'Field title or description missing'});
    }
};

const updateTaskList = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('title') && inputData.hasOwnProperty('description') && inputData.hasOwnProperty('tasklistId')){
        if(inputData['tasklistId'].length == 0){
            return res.status(400).json({error: 'Tasklist Id is missing'});
        }else if(inputData['title'].length == 0 || inputData['description'].length == 0){
            return res.status(400).json({error: 'Title, description must be atleast 1 character'});
        }else{
            try{
                let resp = await Tasklist.updateTasklist(inputData);
                return res.json({message: 'Tasklist details updated successfully'});
            }catch(error){
                console.error('Error updateTaskList ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }
    }else{
        return res.status(400).json({error: 'Field title, description or tasklistId missing'});
    }
};

const deleteTaskList = async (req: Request, res: Response) => {
    let tasklistId = req.body['tasklistId'];
    if(!tasklistId || tasklistId.length == 0){
        return res.status(400).json({error: 'Tasklist Id is missing'});
    }else{
        try{
            let resp = await Tasklist.removeTasklist(tasklistId);
            return res.json({message: 'Tasklist deleted successfully'});
        }catch(error){
            console.error('Error deleteTaskList ::', error);
            return res.status(500).json({error: 'Something went wrong!'});
        }
    }
};

const addTaskToList = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('taskId') && inputData.hasOwnProperty('tasklistId')){
        if(inputData['taskId'].length == 0 || inputData['tasklistId'].length == 0){
            return res.status(400).json({error: 'taskId and tasklistId should be atleast 1 character long'});
        }else{
            try{
                let resp = await TasklistMap.addTaskToList(inputData);
                return res.json({message: 'Task successfully added to the given task list'});
            }catch(error){
                console.error('Error addTaskToList ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }
    }else{
        return res.status(400).json({error: 'Field taskId or tasklistId missing'});
    }
};

const removeTaskFromList = async (req: Request, res: Response) => {
    let inputData = req.body;
    if(inputData.hasOwnProperty('taskId') && inputData.hasOwnProperty('tasklistId')){
        if(inputData['taskId'].length == 0 || inputData['tasklistId'].length == 0){
            return res.status(400).json({error: 'taskId and tasklistId should be atleast 1 character long'});
        }else{
            try{
                let resp = await TasklistMap.removeTaskFromList(inputData);
                return res.json({message: 'Task successfully removed from the given task list'});
            }catch(error){
                console.error('Error removeTaskFromList ::', error);
                return res.status(500).json({error: 'Something went wrong!'});
            }
        }
    }else{
        return res.status(400).json({error: 'Field taskId or tasklistId missing'});
    }
};

export { getAllTaskLists, getSingleTasklist, createTaskList, updateTaskList, deleteTaskList, addTaskToList, removeTaskFromList };