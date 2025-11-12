import express from "express";
import { getAllFriendsRelations } from "../model/friends.js";
import { container } from "tsyringe";
import { FriendsService } from "../services/friends.js";
const friendsService = container.resolve(FriendsService);
export const router = express.Router();
router.get("/", async (req, res) => {
    res.json(await getAllFriendsRelations());
});
router.post("/", async (req, res) => {
    const relation = await friendsService.addFriendship(req.body.firstUserId, req.body.secondUserId);
    res.json(relation);
});
router.get("/user-friends/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const friends = await friendsService.getAllUserFriends(userId);
    res.json(friends || null);
});
//# sourceMappingURL=friends.js.map