const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
	{
        title: {
            type: String,
            required: true,
        },
        // Define the email field with type String, required, and trimmed
        image: {
            type: String,
            required: true,
        },

        creator: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "user",
        },

        tags: [{
            type: String,
        }]

        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);