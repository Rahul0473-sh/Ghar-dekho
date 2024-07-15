import prisma from "../lib/prisma.js"
export const getUsers = async (req,res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to GetUsers" });
    }
}
export const getUser = async(req,res) => {
    try {
        const id = req.userId;
        const user = prisma.user.findUnique({
            where:{id}
        })
    } catch (error) {
        console.log(error.message);
    }
}