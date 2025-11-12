import express, { Response, Request, Router } from "express";
import { getAllFriendsRelations } from "../model/friends.js";
import { FriendRelationDTO } from "../data/friends.types.js";
import { container } from "tsyringe";
import { FriendsService } from "../services/friends.js";
import { UserDTO } from "../data/users.types.js";
import { CreateFriendshipRequestBody } from "./friends.types.js";

const friendsService = container.resolve(FriendsService);

export const router: Router = express.Router();

router.get("/", async (req, res: Response<FriendRelationDTO[] | null>) => {
  res.json(await getAllFriendsRelations());
});

router.post(
  "/",
  async (
    req: Request<{}, {}, CreateFriendshipRequestBody>,
    res: Response<FriendRelationDTO | null>,
  ): Promise<void> => {
    const relation = await friendsService.addFriendship(
      req.body.firstUserId,
      req.body.secondUserId,
    );
    res.json(relation);
  },
);

router.get(
  "/user-friends/:id",
  async (
    req: Request<{ id: number }>,
    res: Response<UserDTO[] | null>,
  ): Promise<void> => {
    const userId: number = Number(req.params.id);
    const friends: UserDTO[] = await friendsService.getAllUserFriends(userId);
    res.json(friends || null);
  },
);
