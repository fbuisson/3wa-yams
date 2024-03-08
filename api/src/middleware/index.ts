import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authentified = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On va chercher le token dans la requête
        const token: string = req.params?.token ?? req.cookies?.token ?? "";

        if (!token) {
            // aucun token = accès interdit
            return res.status(401).json({ message: "Accès interdit" });
        } else {
            // avec jwt on vérifie si le token est valide en fonction de la clé secrète
            verify(token, 'secret', (err: any, decoded: any) => {
                if (err) {
                    res.clearCookie('token'); // token invalide = on le supprime
                    return res.status(401).json({ message: "Accès interdit" });
                }
                res.locals.id = decoded._id.toString();
                next(); // token valide = on passe à la suite
            });
        }
    } catch (err) {
        console.error(err);
        
        return res.status(500).json({ error: "Internal server error" });
    }
};