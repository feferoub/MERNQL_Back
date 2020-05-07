const graphql = require("graphql");
const Comment = require("../../models/comment");
const CommentType = require("../comment/types");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    userName: { type: GraphQLString },
    genre: { type: GraphQLString },
    comments: {
      type: CommentType,
      resolve(parent, args) {
        return Comment.findByUserId(parent.id);
      },
    },
  }),
});

module.exports = UserType;
