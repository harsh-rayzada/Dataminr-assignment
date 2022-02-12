import { Router } from 'express';

import * as Controllers from '../src/controllers/controllers.index';

const Routes = (router: Router) => {
    router.get('/tasks', Controllers.TaskController.getAllTasks);
    router.get('/task/:taskId', Controllers.TaskController.getSingleTask);
    router.post('/task', Controllers.TaskController.createTask);
    router.patch('/task', Controllers.TaskController.updatedTask);
    router.delete('/task', Controllers.TaskController.deleteTask);

    router.get('/tasklists', Controllers.TaskListController.getAllTaskLists);
    router.get('/tasklist/:tasklistId', Controllers.TaskListController.getSingleTasklist);
    router.post('/tasklist', Controllers.TaskListController.createTaskList);
    router.patch('/tasklist', Controllers.TaskListController.updateTaskList);
    router.delete('/tasklist', Controllers.TaskListController.deleteTaskList);

    router.post('/list/task', Controllers.TaskListController.addTaskToList);
    router.delete('/list/task', Controllers.TaskListController.removeTaskFromList)
}

export { Routes };