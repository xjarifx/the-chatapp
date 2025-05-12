import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 16,
  },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
