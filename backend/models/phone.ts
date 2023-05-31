import mongoose from "mongoose";

export interface IPhone extends mongoose.Document {
  name: string;
  number: string;
  uid: string;
}

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  uid: String,
});

phoneSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model<IPhone>("Phone", phoneSchema);
