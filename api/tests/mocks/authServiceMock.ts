import { Response, Request, NextFunction } from 'express';

export const authentifiedMock = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.id = "1";
    next(); 
};
