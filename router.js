import { Router } from "express";
import LoginController from "./src/controllers/LoginController.js";

const router = Router()

router.get("/login", LoginController.renderPageLogin);
// router.post("/login/login", LoginController.login);


export default router;
