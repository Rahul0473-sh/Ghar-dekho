import prisma from "../lib/prisma.js";
export const getPosts = async(req,res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status().json({message:"failed to Get Posts"})
    }
};

export const getPost = async(req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const post = await prisma.post.findUnique({
            where:{id}
        })
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status().json({message:"Failed to Get post"})
    }
};

export const addPost = async (req, res) => {
    try {
        const body = req.body;
        const tokenUserId = req.userId;

        const newPost = await prisma.post.create({
            data: {
                ...body,
                userId: tokenUserId,
            }
        });
        res.status(200).json(newPost);
    }
    catch (error) {
    console.log(error);
    return res.status().json({ message: "Failed to add post" });
  }
};

export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update post" });
  }
};


export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const tokenUserId = req.userId;
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (post.userId !== tokenUserId) return res.status(403).json({ message: "User Not Authorized to Delete" });
        
        await prisma.post.delete({
            where: { id }
        });
        res.status(200).json({ message: "Post Deletion successfull" });
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};