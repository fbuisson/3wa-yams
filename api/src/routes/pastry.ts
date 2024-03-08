import express, { Router, Request, Response } from "express";

import { CustomRequest } from "../middleware/data";
import { authentified } from "../middleware";
import { trimAll } from "../utils/helpers";
import { Pastry } from "../pastry";

import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from "path";
import { upload } from '../middleware/upload';

dotenv.config();

const DATA_PASTRIES = process.env.DATA_PASTRIES || "pastries.json";
const filePath = path.resolve(__dirname, '../Data', DATA_PASTRIES);

const router: Router = express.Router();

// Endpoint pour récupérer toutes les pastries
router.get("/pastries", authentified, async (req: CustomRequest, res: Response) => {
    const pastries: Pastry[] | undefined = req.locals?.pastries

    return res.status(200).json(pastries);
});

// Endpoint pour récupérer une pastrie par son ID
router.get("/pastry/:id", authentified, async (req: CustomRequest, res: Response) => {

    const id: string = req.params.id
    const pastries: Pastry[] | undefined = req.locals?.pastries

    const pastrie: Pastry | undefined = pastries?.find(p => p.id == id)

    if (pastrie) {

        return res.json(pastrie);
    } else {
        return res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }
});

// Endpoint pour récupérer une pastrie avec un mot 
router.get("/pastries-search/:word", authentified, async (req: CustomRequest, res: Response) => {
    const word: string = req.params.word;
    const re = new RegExp(word.trim(), 'i');

    const pastries: Pastry[] | undefined = req.locals?.pastries
    const pastrie: Pastry | undefined = pastries?.find(p => p.name.match(re))

    if (pastrie) {

        return res.json(pastrie);
    } else {
        return res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }
});

// Endpoint pour récupérer des pastries avec offset et limit 
router.get("/pastries/:offset?/:limit", async (req: CustomRequest, res: Response) => {
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);
    const pastries: Pastry[] | undefined = req.locals?.pastries

    const p: Pastry[] | undefined = limit ? pastries?.slice(offset).slice(0, limit) : pastries?.slice(offset)

    return res.json(p);
});

// Endpoint pour récupérer des pastries avec offset et limit avec de l'ordre
router.get("/pastries/order-quantity/:offset?/:limit", authentified, async (req: CustomRequest, res: Response) => {
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);
    const pastries: Pastry[] | undefined = req.locals?.pastries

    // by quantity order 
    pastries?.sort((a, b) => b.quantity - a.quantity)

    const p: Pastry[] | undefined = limit ? pastries?.slice(offset).slice(0, limit) : pastries?.slice(offset)
    return res.json(p);
});

// Endpoint pour récupérer le nombre de pastries 
router.get("/pastries-count", authentified, async (req: CustomRequest, res: Response) => {
    const pastries: Pastry[] | undefined = req.locals?.pastries

    return res.json(pastries?.length || 0);
});

// Endpoint pour ajouter une pastrie
router.post("/pastry", authentified, upload.single('image'), async (req: CustomRequest, res: Response) => {
    const { name, quantity, choice, id } = req.body;
    const p: Pastry = { 
        name: name ?? null, 
        quantity: Number(quantity) ?? null, 
        image: req.file?.filename || '' , 
        choice: Boolean(choice) ?? false };
    const pastries: Pastry[] | undefined = req.locals?.pastries

    // on vérifie les champs obligatoires
    if (!p.name || !p.quantity) {
        return res.status(400).json({
            message: 'Données invalides !'
        });
    }
    if (pastries) {
        // on récupère le dernier id et on incrémente
        const lastId: number = pastries.map(p => ({
            ...p, id: parseInt(p?.id || "0")
        })).sort((p, q) => - (p.id - q.id))[0]?.id || 0
        p.id = (lastId + 1).toString();
        p.image = req?.file?.filename || ''; // on récupère ou pas le nom de l'image
        pastries.push(p);
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

        return res.status(200).json(p);
    }

    return res.status(400).json({
        message: 'Données invalides !'
    });

});

// Endpoint pour modifier une pastrie 
router.put("/pastry/:id", authentified, async (req: CustomRequest, res: Response) => {
    const id: string = req.params.id;
    const { name, quantity, image, choice } = trimAll(req.body);
    let pastries: Pastry[] | undefined = req.locals?.pastries

    let p: Pastry | undefined = pastries?.find(p => p.id == id);

    // on vérifie que la pâtisserie existe
    if (!p) {
        return res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }

    // mettre à jour les données
    pastries = pastries?.map(p => {
        if (p.id == id) {

            return ({
                ...p,
                name: name ?? p.name,
                quantity: quantity ?? p.quantity,
                image: image ?? p.image,
                choice: choice ?? p.choice
            })
        }

        return p
    });

    if (pastries)
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

    return res.json({
        name: name ?? p.name,
        quantity: quantity ?? p.quantity,
        image: image ?? p.image,
        choice: choice ?? p.choice
    });
});

// Endpoint pour supprimer une pastrie avec son id 
router.delete("/pastry/:id", authentified, async (req: CustomRequest, res: Response) => {
    const id: string = req.params.id;
    const pastries = req.locals?.pastries
    const lenPastries: number = pastries?.length || 0
    const p: Pastry[] | undefined = pastries?.filter(p => p.id != id);

    // on vérifie que la pâtisserie existe
    if (lenPastries == p?.length) {
        return res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }
    await fs.writeFile(filePath, JSON.stringify(p), 'utf-8');

    return res.json(p);
})

router.get('*', function (req: Request, res: Response) {
    return res.status(404).json({ error: "Not found" })
});

export default router;