import express, { json } from 'express';
import { signUp, Login } from './Auth.js'
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

app.post("/sign-up", signUp);
app.post("/sign-in", Login);

const port = process.env.PORT
app.listen(port, () => console.log(`port ${port}`));