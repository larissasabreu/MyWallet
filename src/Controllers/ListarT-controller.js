import { db } from '../config/db.js' 

export async function FindTransactions (req, res) {

    try {
        const result = await db.collection("transactions").find().toArray()
        res.status(200).send(result)

        } catch (err) {
        res.status(404).send(err)
        }
}