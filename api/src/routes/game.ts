import express, { Router, Request, Response } from "express"

import { modifyQuantityPastries } from "../utils/helpers";
import { CustomRequest } from "../middleware/data";
import { Pastry } from "../pastry";

import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from "path";
import { PASTRIES } from "../mocks";

dotenv.config();

const DATA_PASTRIES = process.env.DATA_PASTRIES || "pastries.json";
const filePath = path.resolve(__dirname, '../Data', DATA_PASTRIES);

const router: Router = express.Router();

// Endpoint pour récupérer toutes les pastries
router.get('/pastries', async (req: CustomRequest, res: Response) => {
    const pastries: Pastry[] | undefined = req.locals?.pastries

    return res.status(200).json(pastries);
});

// Endpoint pour récupérer une pastrie avec son id 
router.get('/pastry/:id', async (req: CustomRequest, res: Response) => {
    const id: string = req.params.id
    const pastries: Pastry[] | undefined = req.locals?.pastries

    const pastrie: Pastry | undefined = pastries?.find(p => p.id == id)

    // error first
    if (pastrie == undefined) {

        return res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }

    return res.json(pastrie);
});

// Endpoint pour récupérer des/une pastrie(s) gagnées avec mise à jour des données
router.get('/win-pastries/:quantity', async (req: CustomRequest, res: Response) => {
    const quantity: number = parseInt(req.params.quantity)
    let pastries: Pastry[] | undefined = req.locals?.pastries

    // error first
    if (isNaN(quantity) || quantity <= 0)
        return res.status(400).json(
            { message: 'La quantité doit être un nombre entier positif.' }
        );

     // error first
    if (pastries == undefined)
        return res.status(404).json({
            message: 'Pâtisserie(s) non trouvée !'
        });

    // aléatoire sur les pâtisseries encore à gagner
    const pastriesWin : Pastry[] = modifyQuantityPastries(pastries, quantity)
   // console.log(pastriesWin)
    // await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

    return res.json(pastriesWin);
});

// Endpoint pour remttre les données à jour 
router.get("/refresh" , async (req: CustomRequest, res: Response) => {

    if( PASTRIES.length === 0 ){

        return res.status(404).json({
            message: 'No data pastries !'
        });
    }

    await fs.writeFile(filePath, JSON.stringify(PASTRIES), 'utf-8');

    return res.status(200).json({
        message: 'Refresh pastries !'
    });
});

export default router;