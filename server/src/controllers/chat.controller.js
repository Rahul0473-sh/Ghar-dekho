import prisma from "../lib/prisma.js";

export const getChats = async(req,res) => {
    try {
        console.log("hey");
        const tokenUserId = req.userId;
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome:[tokenUserId]
                }
            }
        })
        res.status(200).json(chats);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Failed to get Chats"})
    }
}

export const getChat = async(req, res) => {
    try {
      const tokenUserId = req.userId;
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt:"asc",
                    }
                }
            }
        });
       const hii= await prisma.chat.update({
            where: {
                id:req.params.id,
            },
            data: {
                seenBy: {
                    push:[tokenUserId]
                }
            }
       })
        res.status(200).json(chat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get Chat" });
  }
};

export const addChat = async(req, res) => {
    try {
        const tokenUserId = req.userId;
        const newChat = await prisma.chat.create({
            data: {
                userIDs:[tokenUserId,req.body.reciverId]
            }
        })
        res.status(200).json(newChat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to addChat" });
  }
};
export const readChat = async (req, res) => {
    try {
        const tokenUserId = req.userId;
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                },
            },
            data: {
                seenBy: {
                    set: [tokenUserId],
                }
            }
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to readChat" });
    }
}