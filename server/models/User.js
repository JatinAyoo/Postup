// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
        username: {
            type: String,
            required: true,
            trim: true,
        },
        // Define the email field with type String, required, and trimmed
        email: {
            type: String,
            required: true,
            trim: true,
        },

        // Define the password field with type String and required
        password: {
            type: String,
            required: true,
        },
        token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},

        image: {
			type: String,
			// required: true,
		},

        posts: [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
        }],

        savedPosts : [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
        }],
    },
    { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);