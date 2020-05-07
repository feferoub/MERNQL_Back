require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("../graphql");
const { auth } = require("../middlewares");
var cookieParser = require("cookie-parser");

module.exports = async ({ app }) => {
  // allow cross-origin requests

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // <-- REQUIRED backend setting
    })
  );
  app.use(cookieParser());
  app.use(auth);
  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema,
      context: {
        user: req.user,
      },
      // customFormatErrorFn(err) {
      //   return {
      //     message: err.message.message,
      //     code: err.originalError && err.originalError.code,
      //     locations: err.locations,
      //     path: err.path,
      //   };
      // },
      graphiql: true,
    }))
  );
  app.use(function (err, req, res, next) {
    res.status(err.status).send(err.message);
  });
};
