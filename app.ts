import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import 'dotenv/config';
import { Routes } from './config/routes';
import bodyParser from 'body-parser';
import { connectToDB, closeDbConnection } from './config/PGConn';

const app = express();
// app.use(bodyParser.urlencoded({
//             extended: true,
//         }));
app.use(bodyParser.json());
app.use(cors({ origin: '*', credentials: true }));
const router = express.Router();
const routes = Routes(router);

app.use('/api', router);

const server = createServer(app);

server.listen(process.env.PORT, (): void => {
    console.log(`Server is up and running at localhost:${process.env.PORT}`);
    console.log('Connecting to DB...');
    connectToDB();
});

process.once('SIGABRT', function(){
    console.log(new Date(), 'SIGABRT');
    closeDbConnection();
});

process.once('SIGINT', function(){
    console.log(new Date(), 'SIGINT');
    closeDbConnection();
});

process.once('SIGTERM', function(){
    console.log(new Date(), 'SIGTERM');
    closeDbConnection();
}); 

export default server;