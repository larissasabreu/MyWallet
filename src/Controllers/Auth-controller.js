import { db } from '../config/db.js' 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export async function signUp (req, res) {
    const {name, email, password} = req.body;    

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

    // login
        const user = await db.collection('users').findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {

    // sessão
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,
        {expiresIn: 86400})
        return res.send(token)
            
        } else {
            return res.send("Usuário ou senha não correspondentes!")
        }
    
    
}