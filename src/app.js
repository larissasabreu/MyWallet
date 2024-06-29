import express, { json } from 'express';
import dotenv from "dotenv";
import AuthRouter from './routers/auth-router.js';
dotenv.config();

const app = express();
app.use(json());

app.use(AuthRouter)

const port = process.env.PORT
app.listen(port, () => console.log(`port ${port}`));