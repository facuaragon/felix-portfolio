import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    name: String,
    job: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
