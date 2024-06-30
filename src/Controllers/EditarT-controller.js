import { db } from '../config/db.js' 

export async function EditTransactions (req, res) {
    const { id } = req.params;
    const transaction = req.body;

    try {
        const result = await db.collection("transaction").updateOne({ _id: new ObjectId(id) },
        {$set: transaction});
        if (result.matchedCount === 0) return res.sendStatus(404);
		res.status(204).send("Transação editada!");
        
        } catch (err) {
        res.status(404).send(err);
       }
}