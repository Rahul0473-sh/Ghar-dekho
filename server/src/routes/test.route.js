import { Router } from "express";import { shouldbeAdmin, shouldbelogin } from "../controllers/test.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";
;
const router = Router();

router.route("/test/should-be-login").post(verifyJwt,shouldbelogin)
router.route("/test/should-be-admin").post(shouldbeAdmin);

export default router;