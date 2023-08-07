import { Schema, models, model } from "mongoose";

const googleUserSchema = new Schema(
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

const GUser = models.GUser || model("GUser", googleUserSchema);
export default GUser;
