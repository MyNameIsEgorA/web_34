import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { UserDTO } from "../data/users.types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, "../users.json");

export const getAllUsers = async (): Promise<UserDTO[] | undefined> => {
  const data: string = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

export const getUserById = async (userId: number): Promise<UserDTO | null> => {
  const users: UserDTO[] | undefined = await getAllUsers();
  if (!users) {
    return null;
  }
  return users.find((u) => u.id === userId) || null;
};

export const saveUsers = async (users: UserDTO[]) => {
  await writeFile(DATA_FILE, JSON.stringify(users, null, 2));
};

export const addUser = async (
  user: Omit<UserDTO, "id">,
): Promise<UserDTO | null> => {
  const users: UserDTO[] | undefined = await getAllUsers();
  if (!users) {
    return null;
  }
  const newUser = {
    id: users.length + 1,
    ...user,
  };
  users.push(newUser);
  try {
    await saveUsers(users);
    return newUser;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<UserDTO>,
): Promise<UserDTO | null> => {
  const users: UserDTO[] | undefined = await getAllUsers();
  if (!users) {
    return null;
  }

  const userIndex: number = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return null;
  }

  const updatedUser: UserDTO = {
    ...users[userIndex],
    ...userData,
    id: id,
  };

  users[userIndex] = updatedUser;

  await saveUsers(users);
  return updatedUser;
};
