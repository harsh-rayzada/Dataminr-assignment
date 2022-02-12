import { runQuery } from '../../config/PGConn';

interface createTaskInput {
    title: string,
    description: string
}

interface updateTaskInput {
    taskId: string,
    title: string,
    description: string
}

let getTasks = async (taskId?: string) => {
    let query = `SELECT * from public."Tasks"`;
    let queryParams:any = [];
    if(taskId){
        query += ` where task_id=$1`;
        queryParams.push(taskId);
    }
    try{
        let queryResp = await runQuery(query, queryParams);
        // console.log('queryresp',queryResp);
        return queryResp;
    }catch(error: any){
        throw error;
    }
};

let createTask = async (taskData: createTaskInput) => {
    let query = `INSERT INTO public."Tasks"(
        task_id, title, description, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5);`;
    let queryParams:any = [
        Date.now().toString(), 
        taskData.title,
        taskData.description,
        new Date().toISOString(),
        new Date().toISOString()
    ];
    
    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

let updateTask = async (taskData: updateTaskInput) => {
    let query = `UPDATE public."Tasks"
        SET title=$1, description=$2, updated_at=$3
        WHERE task_id=$4`;
    let queryParams:any = [
        taskData.title,
        taskData.description,
        new Date().toISOString(),
        taskData.taskId
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

let removeTask = async (taskId: string) => {
    let query = `DELETE FROM public."Tasks"
	WHERE task_id=$1`;
    let queryParams:any = [
        taskId
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

export { getTasks, createTask, updateTask, removeTask };