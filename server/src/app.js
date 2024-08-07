import express from "express";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import testRoutes from "./routes/test.route.js"
import postRoutes from "./routes/post.route.js"
import chatRoutes from "./routes/chat.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();


const app = express();
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/chats",chatRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api", testRoutes)


app.listen(8000, () => {
    console.log("app is runing");

 
})