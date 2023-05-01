import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifytoken.js";
const router = express.Router();

router.put("/:id", verifyToken, update);

router.delete("/:id", deleteUser);

router.get("/find/:id", getUser);

router.put("/sub/:id", subscribe);

router.put("/unsub/:id", unsubscribe);

router.put("/like/:videoId", like);

router.put("/dislike/:videoId", unsubscribe);
export default router;
