import express from "express";
import { getAllFriendsRelations } from "../model/friends.js";
export const router = express.Router();
router.get("/", async (req, res) => {
    res.json(await getAllFriendsRelations());
});
//# sourceMappingURL=friends.js.map