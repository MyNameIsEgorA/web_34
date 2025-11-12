import { fileURLToPath } from "url";
import path from "path";
import { FriendRelation } from "../data/friends.types.js";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, "../data/friends.json");

export const getAllFriendsRelations = async (): Promise<
  FriendRelation[] | null
> => {
  try {
    const data: string | undefined = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) || null;
  } catch (e) {
    console.log("ERROR WHILE GETTING FRIENDS RELATIONS", e);
    return null;
  }
};

export const getFriendsRelationById = async (
  relationId: number,
): Promise<FriendRelation | null> => {
  const relations: FriendRelation[] | null = await getAllFriendsRelations();
  if (!relations) {
    return null;
  }
  return relations.find((r) => r.id === relationId) || null;
};

export const getAllUsersFriendsIds = async (
  userId: number,
): Promise<number[]> => {
  const friendsIds: number[] = [];
  const relations: FriendRelation[] | null = await getAllFriendsRelations();
  if (!relations) {
    return friendsIds;
  }
  relations.forEach((relation) => {
    if (relation.first_user_id === userId) {
      friendsIds.push(relation.second_user_id);
    } else if (relation.second_user_id === userId) {
      friendsIds.push(relation.first_user_id);
    }
  });
  return friendsIds;
};
