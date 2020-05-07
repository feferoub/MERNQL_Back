const UserType = require("./types");
const User = require("../../models/user");
const _ = require("lodash");
const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLError,
} = require("graphql");

const UserQuery = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
    },
    resolve: async (parent, args, context) => {
      if (_.isEmpty(args)) {
        return await User.findById(context.user.id);
      }
      const user = await User.findOne(args);
      return user;
    },
  },
  login: {
    type: GraphQLString,
    args: {
      password: { type: GraphQLString, required: true },
      userName: { type: GraphQLString },
    },
    resolve: async (parent, args, context) => {
      let token = await User.login(args);
      return token;
    },
  },
  users: {
    type: new GraphQLList(UserType),
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
    },
    resolve(parent, args, context) {
      return User.find(args);
    },
  },
};

module.exports = UserQuery;
