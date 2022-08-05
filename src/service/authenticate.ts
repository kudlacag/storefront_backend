import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const provideToken = (req: Request, res: Response, next: NextFunction) => {
  const start = process.env.ENV !== 'test';

  if (start) {
    try {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader?.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET as string);

      next();
    } catch (err) {
      res.status(403).json(`Acces denied, invalid token`);
    }
  }
};

export default provideToken;
