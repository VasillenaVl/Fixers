import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected")); // когато бд е свързана, това съобщение ще излиза
  await mongoose.connect(`${process.env.MONGODB_URI}/fixbuddy`);
};

export default connectDB;
