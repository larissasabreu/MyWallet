import { Router } from "express";

// controllers
import { AddTransactions } from '../Controllers/AdicionarT-controller.js'
import { FindTransactions } from "../Controllers/ListarT-controller.js";
import { deleteTransactions } from "../Controllers/DeletarT-controller.js";
import { EditTransactions } from "../Controllers/EditarT-controller.js";
// validação
import { validateSchema } from '../middlewares/schema-middleware.js'
import { validateToken } from "../middlewares/auth-middleware.js";
// schemas
import { AddTransactionsSchema, EditTransactionsSchema } from '../Schemas/Transactions-schemas.js'

// routers
const TransactionsRouter = Router();

TransactionsRouter.post("/transactions", validateToken, validateSchema(AddTransactionsSchema), AddTransactions);
TransactionsRouter.get("/transactions", validateToken, FindTransactions);
TransactionsRouter.put("/transactions:id", validateToken, validateSchema(EditTransactionsSchema), EditTransactions);
TransactionsRouter.delete("/transactions:id", validateToken, deleteTransactions);


export default TransactionsRouter;