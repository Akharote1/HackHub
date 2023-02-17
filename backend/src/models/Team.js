import mongoose from "mongoose";
import connection from '../services/database.js'

const teamSchema = new mongoose.Schema({
	team_name: {
		type: String,
		required: true
	},
	members: {
		type: [{
			user_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "User"
			},
			resume: String
		}],
		required: true
	},
	abstract_link: String,
	presentation_link: String,
	ps_preferences: [Number],
	ps_allotment: {
		title: String,
		number: Number
	}
})

export default connection.model('Team', teamSchema)