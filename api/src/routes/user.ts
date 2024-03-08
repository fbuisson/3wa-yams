import express, { Router, Request, Response } from "express";
import { USERS } from "./../mocks";
import { User } from "./../user";
import { authentified } from "../middleware";

const router: Router = express.Router();
const users: User[] = USERS;

router.get('/users', function (req: Request, res: Response) {
    // on duplique le tableau des utilisateurs sans le champ password
    const usersWithoutPassword: User[] = users.map((user: User) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    return res.status(200).json(usersWithoutPassword);
});

router.get('/me', authentified, function (req: Request, res: Response) {
    const userId = res.locals.id; // res.locals.id est défini dans le middleware authentified
    // find user by id
    const user: User | undefined = users.find(u => u.id == userId);
    if (user) {
        // on duplique l'utilisateur sans le champ password
        const { password, ...userWithoutPassword } = user;

        return res.status(200).json(userWithoutPassword);
    } else {
        // on supprime le token de l'utilisateur
        res.clearCookie('token');
        return res.status(404).json({
            message: 'Utilisateur non trouvé !'
        });
    }
});

export default router;