import { Router } from "express";

import verifyJwt from "../middleware/verifyJwt.js";
import {getUsers} from "../controllers/user.controller.js"
const router = Router();

router.route("/getUsers").get(verifyJwt,getUsers);
router.route("/getUser/:id").get(verifyJwt);
router.route("/deleteUser").delete(verifyJwt);
router.route("/updateUser").put(verifyJwt);

export default router;