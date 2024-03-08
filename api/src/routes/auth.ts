import express, { Router, Request, Response } from "express";

import passwordValidator from 'password-validator'
import { authentified } from "../middleware";

import * as validator from 'email-validator'

import { trimAll } from "../utils/helpers";
import { sign } from 'jsonwebtoken';
import { USERS } from "../mocks";
import { User } from "../user";

import bcrypt from 'bcrypt';

const schema = new passwordValidator().is().min(8)
                                      .is().max(20)
                                      .has().digits()

const users: User[] = USERS;
const router: Router = express.Router();

// Endpoint pour vérifier email et le password pour se connecter
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = trimAll(req.body); // récupération des données du formulaire de login (email et password)
    console.log({ email, password })
    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    // on cherche l'utilisateur dans le mock
    const user: User | undefined = users.find(user => user.email == email);
    if (!user) {
        return res.status(400).json({ message: "Identifiants incorrects" });
    }

    if (!user.password) {
        return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // on compare le mot de passe en clair avec le mot de passe hashé en mock
    bcrypt.compare(password, user.password).then((result: boolean) => {
        if (result) {
            const token = sign({
                _id: user.id /* l'id de l'utilisateur enregistré dans le payload du token */
            }, 'secret', {
                expiresIn: '1h' // le token expire dans 1 heure
            });
           
            res.cookie('token', token, { httpOnly: true, secure: false }); // écriture du cookie avec la valeur du token jwt
            /* httpOnly protege des attaques XSS (quelqu'un de malveillant ne pourra pas lire le cookie facilement) */
            return res.status(200).json({ message: "Vous êtes bien connecté !", id : user.id });
        } else {
            console.log({ message: "Identifiants incorrects" })

            return res.status(400).json({ message: "Identifiants incorrects" })
        }
    });
});

// Endpoint pour s'enregistrer, créer un compte
router.post("/register", function (req: Request, res: Response) {
    const { email, name, password }: User = trimAll(req.body);

    if (name.length < 3) {
        return res.status(400).json({ message: "Le nom doit avoir au moins 3 caractères" });
    }

    if (!password) {
        return res.status(400).json({ message: "Le mot de passe est obligatoire" });
    }

    // on vérifie si le mot de passe est conforme au schéma
    if (!schema.validate(password)) {
        return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères et avoir des chiffres" });
    }

    // on vérifie si l'email est valide
    if (!validator.validate(email)) {
        return res.status(400).json({ message: "L'adresse e-mail saisit est invalide" });
    }

    // on recherche l'utilisateur dans le mock
    const user: User | undefined = users.find(user => user.name == name || user.email == email);
    if (user) {
        if (user.name == name) {
            return res.status(400).json({ message: "Le nom d'utilisateur est déjà prit" });
        } else {
            return res.status(400).json({ message: "L'adresse email est déjà prit" });
        }
    }

    // hash password
    bcrypt.hash(password, 10).then((hash: string) => {

        // on récupère le dernier id de la liste des utilisateurs
        const lastId: string = users[users.length - 1]?.id || "0";

        const user: User = {
            id: parseInt(lastId) + 1 + "", // on incrémente l'id de 1
            name,
            email,
            password: hash
        };
        users.push(user);
        return res.status(200).json({ message: "Vous êtes bien inscrit !" });
    });

});

// Endpoint pour se déconnecter 
router.get('/logout', authentified, function (req: Request, res: Response) {
    res.clearCookie('token');

    return res.status(200).json({
        message: "Vous êtes bien déconnecté", loggedIn : false});
});

export default router;