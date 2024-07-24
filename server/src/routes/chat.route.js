import { Router } from "express";
import {  getChats,getChat,addChat,readChat} from "../controllers/chat.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";
const router = Router();

router.route("/").get(verifyJwt,getChats);
router.route("/:id").get(verifyJwt,getChat);
router.route("/addChat").post(verifyJwt, addChat);
router.route("/read/:id").put(verifyJwt, readChat);

export default router;
