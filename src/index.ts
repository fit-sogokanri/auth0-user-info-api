import { config } from "dotenv-safe";
config();

const debug = require('debug')('auth0-user-info-api:index');

import {app} from "./app";
const port = parseInt(process.env.PORT || "3000", 10);
import http from "http";
app.set("port", port)
const server = http.createServer(app)

server.on("listening", ()=>{
    const address = server.address()
    const bind = typeof address === "string"
        ? "pipe " + address
        : "port " + address?.port
    debug("Listening on " + bind)
})

server.on("error", (error: any)=>{
    throw error;
})

server.listen(port);
