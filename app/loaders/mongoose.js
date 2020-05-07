const mongoose = require("mongoose");

module.exports = async () => {
  const connection = await mongoose.connect(
    "mongodb+srv://felix:felix@cluster0-pcrhk.mongodb.net/test?retryWrites=true&w=majority"
  );
  return connection.connection.db;
};
