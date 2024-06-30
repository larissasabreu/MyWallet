import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import AuthRouter from './routers/auth-router.js';
import TransactionsRouter from './routers/transactions-router.js'

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// app
app.use(AuthRouter);
app.use(TransactionsRouter);

const port = process.env.PORT || 5000 ;
app.listen(port, () => console.log(`porta ${port}`));