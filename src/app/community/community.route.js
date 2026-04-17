
import { Router } from "express";

import { communityController } from "./community.controller.js";
import { verifyToken } from "../../middleware/index.js";

const router = Router();
// who can access

router.post("/posts", verifyToken, communityController.createPost);
router.get("/posts", communityController.getAllPosts);
router.get("/posts/:id", communityController.getSinglePost);
router.patch("/posts/:id", verifyToken, communityController.updatePost);
router.delete("/posts/:id", verifyToken, communityController.deletePost);


export const communityRouter = router;