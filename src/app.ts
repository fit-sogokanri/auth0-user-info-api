import express from "express";
import cors from "cors";
import { config } from "dotenv-safe";
config();

const debug = require("debug")("auth0-user-info-api:app")

import {router as APIRoutes} from "./routes/index"
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.set('view engine', 'jade');
app.use("/", APIRoutes)

app.get("/", (req, res)=>{
    res.status(200).json({message: "ok"})
})

export {app}
