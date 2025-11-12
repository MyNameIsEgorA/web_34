import { fileURLToPath } from "url";
import path from "path";
import { FriendRelationDTO } from "../data/friends.types.js";
import { readFile, writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, "../friends.json");

export const getAllFriendsRelations = async (): Promise<
  FriendRelationDTO[] | null
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
): Promise<FriendRelationDTO | null> => {
  const relations: FriendRelationDTO[] | null = await getAllFriendsRelations();
  if (!relations) {
    throw new Error("Could not get friends relations");
  }
  return relations.find((r) => r.id === relationId) || null;
};

export const doesRelationExists = async (
  firstUserId: number,
  secondUserId: number,
): Promise<boolean> => {
  const relations: FriendRelationDTO[] | null = await getAllFriendsRelations();
  if (!relations) {
    throw new Error("Could not get friends relations");
  }
  for (const relation of relations) {
    if (
      relation.first_user_id === firstUserId &&
      relation.second_user_id === secondUserId
    ) {
      return true;
    }
    if (
      relation.second_user_id === firstUserId &&
      relation.first_user_id === secondUserId
    ) {
      return true;
    }
  }
  return false;
};

export const getAllUsersFriendsIds = async (
  userId: number,
): Promise<number[]> => {
  const friendsIds: number[] = [];
  const relations: FriendRelationDTO[] | null = await getAllFriendsRelations();
  if (!relations) {
    throw new Error("Could not get friends relations");
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

export const addFriend = async (
  firstUserId: number,
  secondUserId: number,
): Promise<FriendRelationDTO | null> => {
  const relations: FriendRelationDTO[] | null = await getAllFriendsRelations();
  if (!relations) {
    throw new Error("Could not get friends relations");
  }
  const newRelation: FriendRelationDTO = {
    id: relations.length + 1,
    first_user_id: firstUserId,
    second_user_id: secondUserId,
  };
  relations.push(newRelation);
  try {
    await writeFile(DATA_FILE, JSON.stringify(relations, null, 2));
    return newRelation;
  } catch (e) {
    console.warn(e);
    return null;
  }
};
