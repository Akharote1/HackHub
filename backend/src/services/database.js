import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connection = mongoose.createConnection(
	"mongodb+srv://cluster0.egbx4dc.mongodb.net/?retryWrites=true&w=majority",
	{
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASS,
	}
);

console.log("Connected to database");

export default connection;
