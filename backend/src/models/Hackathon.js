import mongoose from "mongoose";
import connection from '../services/database.js'

const screeningSchema = new mongoose.Schema({
	resume_required: {
		type: Boolean,
		required: true,
		default: true
	},
	abstract_required: {
		type: Boolean,
		required: true,
		default: false,
	},
	abstract_limit_start: {
		type: Number,
		required: true,
		default: 200
	},
	abstract_limit_end: {
		type: Number,
		required: true,
		default: 500
	},
	presentation_required: {
		type: Boolean,
		required: true,
		default: false,
	},
	guidelines_url: {
		type: String,
		required: true,
		default: false
	}
})

const eventSchema = new mongoose.Schema({
	slug: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	organizer_name: {
		type: String,
		required: true
	},
	organizers: {
		type: [{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User'
		}],
		required: true,
		default: []
	},
	poster_image: {
		type: String,
		required: true
	},
	header_image: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: true
	},
	online: {
		type: Boolean,
		required: true
	},
	venue: {
		type: String
	},
	color: {
		type: String,
		required: false
	},
	domains: {
		type: [{
			type: String,
			enum: ["web-dev", "app-dev", "ai-ml", "blockchain", "cloud", "iot", "ar-vr", "social-cause"],
			required: true,
			default: []
		}]
	},
	event_date: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	registration_start: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	registration_end: {
		type: mongoose.SchemaTypes.Date,
		required: true
	},
	screening: {
		type: screeningSchema,
		required: true,
		default: {}
	},
	min_team_size: {
		type: Number,
		required: true,
		default: 2
	},
	max_team_size: {
		type: Number,
		required: true,
		default: 4
	},
	ps_release_date: mongoose.SchemaTypes.Date,
	ps_form_start: mongoose.SchemaTypes.Date,
	ps_form_end: mongoose.SchemaTypes.Date,
	ps_list: {
		required: true,
		default: [],
		type: [{
			title: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			domains: [{
				type: String,
				enum: ["web-dev", "app-dev", "ai/ml", "blockchain", "cloud", "iot", "ar-vr", "social-cause"],
				required: true,
				default: []
			}]
		}],
		required: true
	}
})


export default connection.model('Hackathon', eventSchema)