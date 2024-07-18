import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
export const getUsers = async (req,res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to GetUsers" });
    }
}
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await prisma.user.findUnique({
            where: { id }
        });
        res.status(200).json({ user });
    } catch (error) {
        console.log("error in getUser",error.message);
    }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

      const { password: userPassword, ...rest } = updatedUser;
      console.log(updateUser);

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const tokenUserID = req.userId;
        if (tokenUserID !== id) return res.status(401).json({ message: "NOT AUTHORIZED" });
        await prisma.user.delete({
            where: { id },
        })
        res.status(200).json({message:"User deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ message: "Failed to Update User" });
    }
}