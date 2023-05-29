import mongoose, { model, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  uid: string;
  email: string;
  displayName: string;
  roles: string[];
  createdAt: string;
}

const UserSchema = new Schema({
  uid: String,
  email: String,
  displayName: String,
  roles: Array<String>,
  createdAt: String,
});

module.exports = mongoose.model<IUser>("User", UserSchema);
