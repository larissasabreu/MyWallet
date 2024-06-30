import { db } from '../config/db.js' 

export async function FindTransactions (req, res) {
    // paginação
    const page = req.query.page || 1;
    const limite = 10; 
    const inicio = (page - 1) * limite;

    try {
        const result = await db.collection("transactions").find()
        .skip(inicio)
        .limit(limite)
        .toArray();
        
        res.status(200).send(result)

        } catch (err) {
        res.status(404).send(err)
        }
}