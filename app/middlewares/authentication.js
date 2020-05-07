const jwt = require("express-jwt");
require("dotenv").config();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: function getToken(req) {
    return req.cookies.token;
  },
});

module.exports = auth;
