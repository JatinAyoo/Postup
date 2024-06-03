const {uploadImageToCloudinary} = require("../utils/imageUploader");
const User = require("../models/User");
const Post = require("../models/Post");

exports.allPost = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      // Pagination parameters
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const skip = (page - 1) * limit;
  
      // Fetch posts with pagination and populate creator's details
      const posts = await Post.find()
        .populate('creator', 'username email image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      // Total number of posts
      const totalCount = await Post.countDocuments();
  
      // Calculate total number of pages
      const totalPages = Math.ceil(totalCount / limit);
  
      // Add a flag to indicate if the post is saved by the user
      const postsWithSavedFlag = posts.map(post => {
        const isSaved = user.savedPosts.includes(post._id);
        return {
          ...post.toObject(),
          isSaved
        };
      });
  
      res.status(200).json({
        posts: postsWithSavedFlag,
        currentPage: page,
        totalPages: totalPages
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Posts`,
        error: error.message,
      });
    }
  };
  


exports.createPost = async (req,res) => {
    const { title , tags} = req.body;
    const creator = req.user.id;

    const photo = req.files.photo
    // const userId = req.user.id

    if (!title || !photo || !creator) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const image = await uploadImageToCloudinary(
      photo,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    try {
        const newPost = new Post({ title, image: image.secure_url, creator ,tags:tags});
        // console.log("newPost " , newPost);
        await newPost.save();
        // console.log("saved");
        // Add the post reference to the creator user
        await User.findByIdAndUpdate(
            
                                creator, 
                                {$push: { posts: newPost._id },},
                                {new : true}
                             
                            );
        // console.log("updated");
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.addBookmark = async (req, res) => {
    try {
      const userId = req.user.id;
      const { postId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.savedPosts.includes(postId)) {
        return res.status(400).json({ message: 'Post already bookmarked' });
      }
  
      user.savedPosts.push(postId);
      await user.save();
  
      res.status(200).json({ message: 'Post bookmarked successfully' });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Remove a post from the user's saved posts
  exports.removeBookmark = async (req, res) => {
    try {
      const userId = req.user.id;
      const { postId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
      await user.save();
  
      res.status(200).json({ message: 'Post removed from bookmarks successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  exports.getSavedPosts = async (req, res) => {
    try {
      // Get the user ID from the request params or auth middleware
      const userId = req.user.id; // assuming you have user ID from a decoded token in middleware
      const { page = 1, limit = 10 } = req.query;
  
      // Find the user by ID and populate the savedPosts field
      const user = await User.findById(userId)
        .populate({
          path: 'savedPosts',
          populate: [
                        { path: 'creator', select: 'username image email' }, // Populate creator
                    ],
          options: { limit: parseInt(limit), skip: (page - 1) * limit }
        });
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
            // Total number of posts
            const totalCount = await User.findById(userId);

            let count = totalCount.savedPosts.length;
            // Calculate total number of pages
            const totalPages = Math.ceil(count / limit);
      // Send only the saved posts as a response
      res.status(200).json({ success: true, savedPosts: user.savedPosts ,currentPage: page,
        totalPages: totalPages});
    } catch (error) {
      console.error("Error fetching saved posts: ", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
