import { Schema, model, models } from "mongoose";

const githubUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const GitUser = models.GitUser || model("GitUser", githubUserSchema);
export default GitUser;
