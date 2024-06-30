import { db } from '../config/db.js' 

export async function AddTransactions(req, res) {
    const { value, description, type} = req.body;

    // adiciona transação, type = deposit || withdraw
    try {
        const result = await db.collection("transactions").insertOne({ value, description, type })
        res.status(201).send(result)

    } catch (err) {
        res.status(422).send(err)
    }
}
