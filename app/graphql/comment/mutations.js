const CommentType = require("./types");
const Comment = require("../../models/comment");
const { GraphQLID, GraphQLString } = require("graphql");

const CommentMutation = {
  addComment: {
    type: CommentType,
    args: {
      user_id: { type: GraphQLID },
      video_id: { type: GraphQLID },
      content: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let comment = await Comment.create(args);
      return comment;
    },
  },
  updateComment: {
    type: CommentType,
    args: {
      id: { type: GraphQLID },
      content: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let comment = await Comment.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
      });
      return comment;
    },
  },
};

module.exports = CommentMutation;
