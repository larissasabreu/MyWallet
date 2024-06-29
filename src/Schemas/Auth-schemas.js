import Joi from "joi";

export const UserSignUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
    });

export const UserLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
    });