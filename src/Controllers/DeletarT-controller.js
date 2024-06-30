import { db } from '../config/db.js' 

export async function deleteTransactions(req, res) {
const { id } = req.params;
  
    try {
        const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.sendStatus(404);
        res.status(204).send("Transação deletada!");

        } catch (err) {
        res.status(404).send(err);
        }
}