import express, { Express } from 'express';
import { readPastries } from "./middleware/data"
import cookieParser from 'cookie-parser';
import router from "./routes/index";
import dotenv from 'dotenv';
import path from 'path' ;
dotenv.config();

const PORT = process.env.PORT || 3001;
const APP_URL = process.env.APP_URL || 'localhost';
const APP_REACT_PORT = process.env.APP_REACT_PORT || '5173';
const APP_REACT_URL = process.env.APP_URL || 'localhost';

import cors from "cors";

const port: any = PORT;
const app: Express = express();

// dossier des assets statiques accessible avec l'adresse de l'API
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  // url app
  origin: `http://${APP_REACT_URL}:${APP_REACT_PORT}`,
  credentials: true
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

// les données
app.use( readPastries  )

// router
app.use(router);

app.listen(port, () =>
  console.log(`listen http://${APP_URL}:${port}`),
);