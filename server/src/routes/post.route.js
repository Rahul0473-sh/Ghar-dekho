import { Router } from "express";
import { addPost, deletePost, updatePost, getPost, getPosts } from "../controllers/post.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";
const router = Router();

router.route("/getPosts").get(getPosts);
router.route("/getPost/:id").get(getPost);
router.route("/addPost").post(verifyJwt,addPost);
router.route("/updatePost/:id").put(verifyJwt,updatePost);
router.route("/deletePost/:id").delete(verifyJwt,deletePost);

export default router;
