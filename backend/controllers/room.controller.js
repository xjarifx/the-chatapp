import Room from "../models/room.model.js";

// Add a new room
export const addRoom = async (req, res) => {
  const { name, id } = req.body;

  if (!name || !id) {
    return res.status(400).send({ message: "Room name and id are required" });
  }

  try {
    const existingRoom = await Room.findOne({ id });
    if (existingRoom) {
      return res.status(409).send({ message: "Room already exists" });
    }
    const newRoom = new Room({ name, id });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};