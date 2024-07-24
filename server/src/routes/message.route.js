import { Router } from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import { addMessage } from "../controllers/message.controller.js";
const router = Router();
router.route("/:chatId").post(verifyJwt,addMessage)



export default router;