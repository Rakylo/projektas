import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  surname: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 50,
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
});

export default mongoose.model("Client", clientSchema);
