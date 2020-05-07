const mongoose = require("mongoose");
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

videoSchema.methods = {
  //   authenticate: function (password) {
  //     return passwordHash.verify(password, this.password);
  //   },
  //   getToken: function () {
  //     return jwt.encode(this, "mediumMernAppCreation");
  //   },
};

module.exports = mongoose.model("Video", videoSchema);
