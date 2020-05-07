const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    video_id: { type: GraphQLID },
    content: { type: GraphQLString },
  }),
});

module.exports = CommentType;
