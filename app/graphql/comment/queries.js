const CommentType = require("./types");
const Comment = require("../../models/comment");

const { GraphQLID, GraphQLList, GraphQLString } = require("graphql");

const CommentQuery = {
  comment: {
    type: CommentType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (parent, args) => {
      const comment = await Comment.findOne(args);
      return comment;
    },
  },
  comments: {
    type: new GraphQLList(CommentType),
    resolve(parent, args) {
      return Comment.find({});
    },
  },
};

module.exports = CommentQuery;
