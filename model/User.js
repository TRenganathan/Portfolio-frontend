const mongoose = require("mongoose");
const GridItemSchema = require("./GridItemSchema");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
  totpSecret: {
    type: Object,
    required: false,
  }, // Add this field to store the TOTP secret key
  recoveryKeys: {
    type: Array,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: false,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  gridItems: [GridItemSchema],
  provider: {
    type: String,
    required: false,
    default: "credentials",
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
