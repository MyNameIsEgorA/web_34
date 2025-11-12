import {userRouter} from "./routes/index.js"
import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
