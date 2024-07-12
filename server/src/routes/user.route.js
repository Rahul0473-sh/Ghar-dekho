import { Router } from "express";
import { login } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").get(login)

export default router;