import mongoose from "mongoose";
import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import { slugify } from "../utils.js";

export const register = async (req, res) => {
	try {
		const user = req.user;

		const event = await Hackathon.findOne({ slug: req.params.slug });

		if (!event) {
			return res.send({
				success: false,
				message: "That event does not exist",
			});
		}
		console.log(req.body);

		const members = req.body.team_members;

		if (
			(false && event.min_team_size > members.length) ||
			members.length > event.max_team_size
		) {
			return res.send({
				success: false,
				message: "Invalid team size",
			});
		}

		if (members[0].email !== user.email) {
			return res.send({
				success: false,
				message: "The logged in user must be the team leader",
			});
		}

		const genderCounts = {
			male: 0,
			female: 0,
			other: 0,
			unknown: 0,
		};

		for (let i = 0; i < members.length; i++) {
			const member = await User.findOne({ email: members[i].email });
			genderCounts[member.gender] += 1;
			if (
				member.teams.filter((team) => event.teams.includes(team)).length != 0
			) {
				return res.send({
					success: false,
					message: `Member ${member.email} has already registered for this hackathon.`,
				});
			}
		}

		const team = new Team({
			_id: new mongoose.Types.ObjectId(),
			team_name: req.body.team_name,
			members: members,
			registration_time: new Date(),
			hackathon_name: event.name,
			hackathon_id: event._id,
		});

		user.teams.push(team._id);
		event.teams.push(team._id);
		event.registration_count += members.length;
		event.male_count += genderCounts["male"];
		event.female_count += genderCounts["female"];
		event.other_gender_count += genderCounts["other"];

		const teamResult = await team.save();
		await user.save();
		await event.save();

		return res.status(200).json({
			success: true,
			team_id: teamResult._id,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};

export const submitScreening = async (req, res) => {
	try {
		const user = req.user;
		const team = await Team.findOne({ _id: req.params.teamID });
		const event = await Hackathon.findOne({ _id: team.hackathon_id });

		if (!event) {
			return res.send({
				success: false,
				message: "That event does not exist",
			});
		}

		if (team.screening_submitted) {
			return res.send({
				success: false,
				message: "The screening round has already been submitted",
			});
		}

		if (event.screening.abstract_required) {
			if (!req.body.abstract_text) {
				return res.send({
					success: false,
					message: "Abstract is required",
				});
			} else {
				team.abstract_text = req.body.abstract_text;
			}
		}

		if (event.screening.presentation_required) {
			if (!req.body.presentation_link) {
				return res.send({
					success: false,
					message: "Presentation is required",
				});
			} else {
				team.presentation_link = req.body.presentation_link;
			}
		}

		team.screening_submitted = true;

		await team.save();

		return res.status(200).json({
			success: true,
			message: "Submitted screening round!",
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};
