import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
/**
 * Middleware pour uploader des images
 * 1. Destination dossier d'assets Node
 * 2. Calcul de l'extension du fichier 
 */
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) => {
    cb(null, path.join(__dirname, '../uploads/images/') ); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

export const upload: Multer = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });