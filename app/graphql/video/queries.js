const VideoType = require("./types");
const Video = require("../../models/video");

const { GraphQLID, GraphQLList, GraphQLString } = require("graphql");

const VideoQuery = {
  video: {
    type: VideoType,
    args: {
      id: { type: GraphQLID },
      category: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const video = await Video.findOne(args);
      return video;
    },
  },
  videos: {
    type: new GraphQLList(VideoType),
    args: {
      category: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Video.find(args);
    },
  },
};

module.exports = VideoQuery;
