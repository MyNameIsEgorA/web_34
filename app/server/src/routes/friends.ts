import express, { Response, Router } from "express";
import { UserDTO } from "../data/users.types.js";
import { getAllUsers } from "../model/users.js";
import { getAllFriendsRelations } from "../model/friends.js";
import { FriendRelationDTO } from "../data/friends.types.js";

export const router: Router = express.Router();
router.get("/", async (req, res: Response<FriendRelationDTO[] | null>) => {
  res.json(await getAllFriendsRelations());
});
