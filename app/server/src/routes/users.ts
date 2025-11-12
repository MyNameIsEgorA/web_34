import express from "express";
import { addUser, getAllUsers, updateUser } from "../model/users.js";
import { UserDTO } from "../data/users.types.js";
import { Request, Response, Router } from "express";
import { CreateUserRequestBody, UpdateUserRequestBody } from "./users.types.js";
export const router: Router = express.Router();

router.get("/", async (req, res: Response<UserDTO[] | undefined>) => {
  res.json(await getAllUsers());
});

router.post(
  "/",
  async (
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response<UserDTO | null>,
  ) => {
    const { name, birthDate, email, avatar, role, status, password } = req.body;
    const user: Omit<UserDTO, "id"> = {
      name,
      birthDate,
      email,
      avatar: avatar || null,
      role: role || "user",
      status: status || "inactive",
      password: password,
    };
    const newUser: UserDTO | null = await addUser(user);
    res.json(newUser);
  },
);

router.put(
  "/:id",
  async (
    req: Request<{ id: string }, {}, UpdateUserRequestBody>,
    res: Response<UserDTO | null>,
  ): Promise<void> => {
    const userId: number = Number(req.params.id);
    const updatedUser: UserDTO | null = await updateUser(userId, req.body);
    res.json(updatedUser);
  },
);
