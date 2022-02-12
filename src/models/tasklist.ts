import { runQuery } from '../../config/PGConn';

interface createTasklistInput {
    title: string,
    description: string
}

interface updateTasklistInput {
    tasklistId: string,
    title: string,
    description: string
}

let getTasklists = async (tasklistId?: string) => {
    let query = `SELECT * from public."Tasklist"`;
    let queryParams:any = [];
    if(tasklistId){
        query += ` where tasklist_id=$1`;
        queryParams.push(tasklistId);
    }
    try{
        let queryResp = await runQuery(query, queryParams);
        return queryResp;
    }catch(error: any){
        throw error;
    }
};

let createTasklist = async (tasklistData: createTasklistInput) => {
    let query = `INSERT INTO public."Tasklist"(
        tasklist_id, title, description, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5);`;
    let queryParams:any = [
        Date.now().toString(), 
        tasklistData.title,
        tasklistData.description,
        new Date().toISOString(),
        new Date().toISOString()
    ];
    
    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

let updateTasklist = async (tasklistData: updateTasklistInput) => {
    let query = `UPDATE public."Tasklist"
        SET title=$1, description=$2, updated_at=$3
        WHERE tasklist_id=$4`;
    let queryParams:any = [
        tasklistData.title,
        tasklistData.description,
        new Date().toISOString(),
        tasklistData.tasklistId
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

let removeTasklist = async (tasklistId: string) => {
    let query = `DELETE FROM public."Tasklist"
	WHERE tasklist_id=$1`;
    let queryParams:any = [
        tasklistId
    ];

    try{
        return await runQuery(query, queryParams);
    }catch(error: any){
        throw error;
    }
};

export { getTasklists, createTasklist, updateTasklist, removeTasklist };