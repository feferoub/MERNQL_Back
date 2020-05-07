const graphql = require("graphql");
const Comment = require("../../models/comment");
const CommentType = require("../comment/types");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    comments: {
      type: CommentType,
      resolve(parent, args) {
        return Comment.findByVideoID(parent.id);
      },
    },
  }),
});

module.exports = VideoType;
