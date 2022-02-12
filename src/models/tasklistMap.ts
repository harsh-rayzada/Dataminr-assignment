import { runQuery } from '../../config/PGConn';

interface tasklistMapInput {
    taskId: string,
    tasklistId: string
}

const addTaskToList = async (inputData: tasklistMapInput) => {
    let query = `INSERT into public."TasklistMap"(
        tasklist_id, task_id, created_at)
        VALUES ($1, $2, $3);
        `;
    let queryParams:any = [
        inputData.tasklistId,
        inputData.taskId,
        new Date().toISOString()
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        console.error('error addTaskToList ::', error);
        throw error;
    }
};

const removeTaskFromList = async (inputData: tasklistMapInput) => {
    let query = `DELETE from public."TasklistMap" where tasklist_id=$1 and task_id=$2`;
    let queryParams:any = [
        inputData.tasklistId,
        inputData.taskId
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        console.error('error removeTaskFromList ::', error);
        throw error;
    }
};

export { addTaskToList, removeTaskFromList };