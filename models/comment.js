const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema9({
  articleComment: String,
});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
