import express from "express";
import dotenv from "dotenv"
import router from "../router.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import csrf from "csurf"
import cookieParser from "cookie-parser"
import Middleware from "../src/middleware/middleware.js"

dotenv.config();

const app = express();
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ServerConfiguration{

    setupExpress(){
        app.set("views", path.resolve(__dirname, "../src/views"));
        app.set("view engine", "ejs");

        app.use(cookieParser());
        app.use(express.urlencoded({extended: true}));
        app.use(express.static(path.resolve(__dirname, "..", "public")));
        app.use(express.json());
        app.use(csrf({ cookie: true }));
        app.use(Middleware.csrfMiddleware);
        app.use(router);
        app.use(Middleware.checkCsrfError);

    }


    runServer(){
        this.setupExpress();
        this.connectDatabase();
        app.on("ready", () => {
            app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/login`)
        })})

    }


    connectDatabase(){
        mongoose.connect(process.env.CONNECTIONSTRING)
        .then(() => {
            app.emit("ready");
        }).catch(e => console.log(e));
    }

}


export default ServerConfiguration;
