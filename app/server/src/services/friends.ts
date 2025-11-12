import { injectable } from "tsyringe";
import { UserDTO } from "../data/users.types.js";
import {
  getAllFriendsRelations,
  getAllUsersFriendsIds,
} from "../model/friends.js";
import { getAllUsers } from "../model/users.js";

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
}
