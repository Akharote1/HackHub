import mongoose from "mongoose";
import connection from '../services/database.js'

const eventSchema = new mongoose.Schema({
	slug: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	poster_image: {
		type: String,
		required: true
	},
	header_image: {
		type: String,
		required: false
	},
	summary: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	register_link: {
		type: String
	},
	register_deadline: {
		type: mongoose.SchemaTypes.Date
	},
	register_enabled: {
		type: Boolean
	},
	online: {
		type: Boolean
	},
	location: {
		type: String
	},
	color: {
		type: String
	},
	event_date: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	user_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	}
})

export default connection.model('Event', eventSchema)