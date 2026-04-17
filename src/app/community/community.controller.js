import prisma from "../../../lib/prisma.js";
import { sendResponse } from "../../utils/return-response.js";


const createPost = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, 401, false, "Unauthorized");
    }

    const { postContent } = req.body;

    if (!postContent) {
      return sendResponse(res, 400, false, "Post content required");
    }

    const post = await prisma.communityPost.create({
      data: {
        userId,
        postContent
      }
    });

    return sendResponse(res, 201, true, "Post created", post);

  } catch (error) {
    next(error);
  }
};


const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.communityPost.findMany({
      include: {
        user: true
      },
      orderBy: {
        postDate: "desc"
      }
    });

    return sendResponse(res, 200, true, "Posts fetched", posts);

  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const post = await prisma.communityPost.findUnique({
      where: { id },
      include: {
        user: true
      }
    });

    if (!post) {
      return sendResponse(res, 404, false, "Post not found");
    }

    return sendResponse(res, 200, true, "Post fetched", post);

  } catch (error) {
    next(error);
  }
};


const updatePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.id);

    const post = await prisma.communityPost.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return sendResponse(res, 404, false, "Post not found");
    }

   
    if (post.userId !== userId) {
      return sendResponse(res, 403, false, "Access denied");
    }

    const updated = await prisma.communityPost.update({
      where: { id: postId },
      data: {
        postContent: req.body.postContent
      }
    });

    return sendResponse(res, 200, true, "Post updated", updated);

  } catch (error) {
    next(error);
  }
};


const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.id);

    const post = await prisma.communityPost.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return sendResponse(res, 404, false, "Post not found");
    }

    if (post.userId !== userId) {
      return sendResponse(res, 403, false, "Access denied");
    }

    await prisma.communityPost.delete({
      where: { id: postId }
    });

    return sendResponse(res, 200, true, "Post deleted");

  } catch (error) {
    next(error);
  }
};

export const communityController = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost
};