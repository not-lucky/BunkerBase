import User from "../models/User.js";
import Post from "../models/Post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userID, description, picturePath } = req.body;
    const user = await User.findById(userID);

    const newPost = new Post({
      userID: userID,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: description,
      picturePath: picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    })

    await newPost.save();

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}


/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await User.findById(id);

    const userPosts = await Post.find({ id: id })

    res.status(200).json(userPosts);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


/* UPDATE */

export const likePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const { userId } = req.body;

    const post = await Post.findById({ id: postID });

    const hasLiked = post.likes.get(userId);

    if (hasLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.put(userId, true);
    }

    // await post.save();

    // no need to manually save, as it updates
    // boolean new: true returns updated post
    const updatedPost = Post.findByIdAndUpdate(
      postID,
      { likes: post.likes },
      { new: true }
    );



    res.status(200).json(updatedPost);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}