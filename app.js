const loaders = require("./app/loaders");
const express = require("express");

async function startServer() {
  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `Your server is ready ! Running on port ${process.env.PORT || 8000}`
    );
  });
}

startServer();
