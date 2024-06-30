import { db } from '../config/db.js' 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
dotenv.config();

export async function validateToken (req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization?.replace("Bearer ", "");
          if (!token) {
          return res.sendStatus(401);
          }
      
        try {
            jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
                if (error) return res.status(401)
                  
                const user = await db.collection("users").findOne({ 
                _id: new ObjectId(decoded.userId) 
                });
                if (!user) {
                return res.sendStatus(401);
                }
                delete user.password;
            
                res.locals.user = user;
                return next();
            })

         } catch (err) {
            res.status(401).send(err)
        }
      
      }