import mongoose from "mongoose";
import connection from '../services/database.js'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password_hash: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: false
	},
	college: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: false
	},
	gender: {
		type: String,
		required: true,
		default: 'unknown',
		enum: ['male', 'female', 'unknown', 'other']
	},
	domains: {
		type: [{
			type: String,
			enum: ["web-dev", "app-dev", "ai/ml", "blockchain", "cloud", "iot", "ar-vr", "social-cause"],
			required: true
		}]
	},
})

export default connection.model('User', userSchema)