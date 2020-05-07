const VideoType = require("./types");
const Video = require("../../models/video");
const { GraphQLID, GraphQLString } = require("graphql");

const VideoMutation = {
  addVideo: {
    type: VideoType,
    args: {
      title: { type: GraphQLString },
      url: { type: GraphQLString },
      category: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let video = await Video.create(args);
      return video;
    },
  },
  updateVideo: {
    type: VideoType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
      category: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      let video = await Video.findOneAndUpdate(
        { firstName: args.firstName },
        args,
        { new: true }
      );
      return video;
    },
  },
};

module.exports = VideoMutation;
