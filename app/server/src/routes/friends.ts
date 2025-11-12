import express, { Response, Request, Router } from "express";
import { getAllFriendsRelations } from "../model/friends.js";
import { FriendRelationDTO } from "../data/friends.types.js";
import { container } from "tsyringe";
import { FriendsService } from "../services/friends.js";
import { UserDTO } from "../data/users.types.js";

const friendsService = container.resolve(FriendsService);

export const router: Router = express.Router();

router.get("/", async (req, res: Response<FriendRelationDTO[] | null>) => {
  res.json(await getAllFriendsRelations());
});

router.get(
  "/user-friends/:id",
  async (req: Request<{ id: number }>, res: Response<UserDTO[] | null>) => {
    const userId: number = Number(req.params.id);
    const friends: UserDTO[] = await friendsService.getAllUserFriends(userId);
    res.json(friends || null);
  },
);
