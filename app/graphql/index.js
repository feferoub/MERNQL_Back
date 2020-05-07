var { GraphQLSchema, GraphQLObjectType } = require("graphql");
var userMutations = require("./user/mutations");
var userQueries = require("./user/queries");
var videoMutations = require("./video/mutations");
var videoQueries = require("./video/queries");
var commentMutations = require("./comment/mutations");
var commentQueries = require("./comment/queries");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQuery",
    fields: {
      ...userQueries,
      ...commentQueries,
      ...videoQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: {
      ...userMutations,
      ...commentMutations,
      ...videoMutations,
    },
  }),
});
