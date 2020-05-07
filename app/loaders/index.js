const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

module.exports = {
  init: async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    console.log("MongoDB initialized");
    await expressLoader({ app: expressApp });
    console.log("Express initialized");
  },
};
