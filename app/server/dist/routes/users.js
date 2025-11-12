import express from "express";
import { addUser, getAllUsers, updateUser } from "../model/users.js";
export const router = express.Router();
router.get("/", async (req, res) => {
    res.json(await getAllUsers());
});
router.post("/", async (req, res) => {
    const { name, birthDate, email, avatar, role, status, password } = req.body;
    const user = {
        name,
        birthDate,
        email,
        avatar: avatar || null,
        role: role || "user",
        status: status || "inactive",
        password: password,
    };
    const newUser = await addUser(user);
    res.json(newUser);
});
router.put("/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const updatedUser = await updateUser(userId, req.body);
    res.json(updatedUser);
});
//# sourceMappingURL=users.js.map