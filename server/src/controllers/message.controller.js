import prisma from "../lib/prisma.js";
export const addMessage = async (req, res) => {
    try {
        const tokenUserId = req.userId;
        const chatid = req.params.chatId;
        const {text}= req.body;
        console.log(text)

        const chat = await prisma.chat.findUnique({
            where: {
                id: chatid,
                userIDs: {
                    hasSome:[tokenUserId]
                }
            }
        })
        console.log(chat);
        if (!chat) return res.status(404).json({ message: "Chat not Found" });
        const message = await prisma.message.create({
            data: {
                text,
                chatId: chatid,
                userId: tokenUserId
            }
        });
        await prisma.chat.update({
            where: {
                id:chatid
            },
            data: {
                lastMessage: text,
                seenBy:[tokenUserId]
            }
        })
        return res.status(200).json(message);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"failed to addMessage"})
    }
}