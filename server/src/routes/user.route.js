import { Router } from "express";

import verifyJwt from "../middleware/verifyJwt.js";
import {deleteUser, getUsers, updateUser,getUser} from "../controllers/user.controller.js"
const router = Router();

router.route("/getUsers").get(verifyJwt,getUsers);
router.route("/getUser/:id").get(verifyJwt,getUser);
router.route("/deleteUser/:id").delete(verifyJwt,deleteUser);
router.route("/updateUser/:id").put(verifyJwt,updateUser);

export default router;