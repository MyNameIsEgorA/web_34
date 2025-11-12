import { injectable } from "tsyringe";
import { UserDTO } from "../data/users.types.js";
import {
  addFriend,
  doesRelationExists,
  getAllUsersFriendsIds,
} from "../model/friends.js";
import { getAllUsers, getUserById } from "../model/users.js";
import { FriendRelationDTO } from "../data/friends.types.js";

@injectable()
export class FriendsService {
  getAllUserFriends = async (userId: number): Promise<UserDTO[]> => {
    const friends: Set<UserDTO> = new Set();

    const friendIds: number[] = await getAllUsersFriendsIds(userId);
    const users: UserDTO[] | undefined = await getAllUsers();
    if (!users || friendIds.length === 0) {
      return [];
    }

    friendIds.forEach((id: number) => {
      const user: UserDTO | undefined = users.find((u) => u.id === id);
      if (user) {
        friends.add(user);
      }
    });
    return Array.from(friends);
  };

  addFriendship = async (
    firstUserId: number,
    secondUserId: number,
  ): Promise<FriendRelationDTO | null> => {
    const firstUser: UserDTO | null = await getUserById(firstUserId);
    const secondUser: UserDTO | null = await getUserById(secondUserId);

    if (!firstUser || !secondUser) {
      return null;
    }

    const isRelationCreated: boolean = await doesRelationExists(
      firstUserId,
      secondUserId,
    );

    if (isRelationCreated) {
      return null;
    }

    return await addFriend(firstUserId, secondUserId);
  };
}
