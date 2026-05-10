import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import testRoutes from "./routes/test.route.js"
import postRoutes from "./routes/post.route.js"
import chatRoutes from "./routes/chat.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./lib/prisma.js"

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const exists = onlineUsers.find((u) => u.userId === userId);
  if (!exists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api", testRoutes);
app.use('/hello',(req,res)=>{
  res.send("hellow");
})

httpServer.listen(8000, async () => {
  await connectDB();
  console.log("Server running on port 8000");
});
