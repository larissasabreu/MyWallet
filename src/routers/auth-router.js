import { Router } from "express";

import { signUp, Login } from '../Controllers/Auth-controller.js'
import { validateSchema } from '../middlewares/schema-middleware.js'
import { UserSignUpSchema, UserLoginSchema } from '../Schemas/Auth-schemas.js'

const AuthRouter = Router();

AuthRouter.post("/sign-up", validateSchema(UserSignUpSchema), signUp);
AuthRouter.post("/sign-in", validateSchema(UserLoginSchema), Login);

export default AuthRouter;