import Joi from 'joi';
import { db } from './db.js' 
import bcrypt from 'bcrypt';

export async function signUp (req, res) {
    const {name, email, password} = req.body;    

    // validação
    const UserSignUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
        })

    const validation = UserSignUpSchema.validate({name, email, password}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    // encrypt
    const passwordHash = bcrypt.hashSync(password, 10);

    // post 
    try {
        const usersCadastrados = await db.collection("users").findOne({ email })
        if (usersCadastrados) {
            return res.status(409).send("E-mail já cadastrado")
        }

        const result = await db.collection("users").insertOne({ name, email, password: passwordHash })
        res.status(201).send(result)

        } catch (err) {
        res.status(422).send(err)
        }
}


export async function Login (req, res) {
    const { email, password } = req.body;

    // validação
    const UserLoginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
        })
    
    const validation = UserLoginSchema.validate({ email, password}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    // login
        const user = await db.collection('users').findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            return res.send("logado!")
        } else {
            return res.send("Usuário ou senha não correspondentes!")
        }
    
    
}