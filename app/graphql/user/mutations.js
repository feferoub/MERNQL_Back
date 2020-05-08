const UserType = require("./types");
const User = require("../../models/user");
const { GraphQLID, GraphQLString } = require("graphql");

const UserMutation = {
  signup: {
    type: GraphQLString,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      genre: { type: GraphQLString },
      password: { type: GraphQLString },
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let token = await User.signup(args);
      return token;
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let user = await User.findOneAndUpdate(
        { firstName: args.firstName },
        args,
        { new: true }
      );
      return user;
    },
  },
};

module.exports = UserMutation;
