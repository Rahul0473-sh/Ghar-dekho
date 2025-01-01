import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
export const getPosts = async (req, res) => {
    const query = req.query;
    try {
        const posts = await prisma.post.findMany({
          where: {
            city: query.city || undefined,
            type:query.type  || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                gte:parseInt(query.minPrice) || undefined,
                lte:parseInt(query.maxPrice) || undefined,// need to understand this
            }
          },
        });
        console.log()
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status().json({ message: "failed to Get Posts" }); 
    }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err)   {
          return res.status(200).json({ ...post, isSaved: false });
        }
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get post" });
  }
};


export const addPost = async (req, res) => {
    try {
        const body = req.body;
        const tokenUserId = req.userId;

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create:body.postDetail,
                }
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