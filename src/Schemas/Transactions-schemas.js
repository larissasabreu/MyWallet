import Joi from 'joi'

export const AddTransactionsSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('deposit', 'withdraw').required() // deposit, withdraw
    });

export const EditTransactionsSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('deposit', 'withdraw').required() // deposit, withdraw
    });