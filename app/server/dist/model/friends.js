import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, "../friends.json");
export const getAllFriendsRelations = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data) || null;
    }
    catch (e) {
        console.log("ERROR WHILE GETTING FRIENDS RELATIONS", e);
        return null;
    }
};
export const getFriendsRelationById = async (relationId) => {
    const relations = await getAllFriendsRelations();
    if (!relations) {
        return null;
    }
    return relations.find((r) => r.id === relationId) || null;
};
export const getAllUsersFriendsIds = async (userId) => {
    const friendsIds = [];
    const relations = await getAllFriendsRelations();
    if (!relations) {
        return friendsIds;
    }
    relations.forEach((relation) => {
        if (relation.first_user_id === userId) {
            friendsIds.push(relation.second_user_id);
        }
        else if (relation.second_user_id === userId) {
            friendsIds.push(relation.first_user_id);
        }
    });
    return friendsIds;
};
export const addFriend = async (firstUserId, secondUserId) => {
    const relations = await getAllFriendsRelations();
    if (!relations) {
        return null;
    }
    const newRelation = {
        id: relations.length + 1,
        first_user_id: firstUserId,
        second_user_id: secondUserId,
    };
    relations.push(newRelation);
    try {
        await writeFile(DATA_FILE, JSON.stringify(relations, null, 2));
        return newRelation;
    }
    catch (e) {
        console.warn(e);
        return null;
    }
};
//# sourceMappingURL=friends.js.map