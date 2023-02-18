import mongoose from "mongoose";
import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import { notify } from "../services/mail.js";
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

		if (members[0].user_id != user._id) {
      return res.send({
        success: false,
        message: "The logged in user must be the team leader"
      })
    }

    const genderCounts = {
      'male': 0,
      'female': 0,
      'other': 0,
      'unknown': 0
    }

    for (let i = 0; i < members.length; i++) {
      const member = await User.findOne({_id: members[i].user_id})
      genderCounts[member.gender] += 1;
      if (member.teams.filter(team => event.teams.includes(team)).length != 0) {
        return res.send({
          success: false,
          message: `Member ${member.email} has already registered for this hackathon.`
        })
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
    const event = await Hackathon.findOne({ slug: req.params.slug });

    if (!event) {
      return (
        res.send({
          success: false,
          message: "That event does not exist"
        })
      )
    }
    
    const team = await Team.findOne({ hackathon_id: event._id, "members.user_id": user._id })
      .populate("members.user_id", "name email phone gender");
    
    if (team.screening_submitted) {
      return (
        res.send({
          success: false,
          message: "The screening round has already been submitted"
        })
      )
    }

    team.abstract_text = req.body.abstract_text ?? "";

    team.presentation_link = req.body.presentation_link ?? ""

    team.screening_submitted = true;

    await team.save()

    notify(team.members.map(x => x.user_id.email), 'Round 1 Submitted | ' + event.name, 
      'You have successfully submitted round 1 of the hackathon.')

    return res.status(200).json({
      success: true,
      message: "Submitted screening round!"
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}

export const submitPreferences = async (req, res) => {
  try {
    const user = req.user;
    const event = await Hackathon.findOne({ slug: req.params.slug });
    const team = await Team.findOne({ hackathon_id: event._id, "members.user_id": user._id })
      .populate("members.user_id", "name email phone gender");

    if (!event) {
      return (
        res.send({
          success: false,
          message: "That event does not exist"
        })
      )
    }

    team.ps_preferences = req.body.preferences;

    await team.save()

    notify(team.members.map(x => x.user_id.email), 'PS Preference Submitted | ' + event.name, 
      'You have successfully submitted your PS preferences as the following: ' 
      + team.ps_preferences.map(x => 'PS ' + x).join(', '))

    return res.status(200).json({
      success: true,
      message: "Submitted preferences!",
      team
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}

export const findTeam = async (req, res) => {
	try {
		const user = req.user;
		const event = await Hackathon.findOne({ slug: req.params.slug });

		if (!event) {
			return res.send({
				success: false,
				message: "That event does not exist",
			});
		}

		const team = await Team.findOne({
			hackathon_id: event._id,
			"members.user_id": user._id,
		});

		return res.status(200).json({
			success: true,
			team,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};

export const updateScores = async (req, res) => {
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

		team.scores = req.body.scores;

		await team.save();

		return res.status(200).json({
			success: true,
			message: "Updated scores!",
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};

export const shortlist = async (req, res) => {
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

		team.shortlisted = true;
		event.shortlist_count += 1;

		await team.save();

		return res.status(200).json({
			success: true,
			message: "Shortlisted team!",
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};

export const rollback = async (req, res) => {
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

		team.shortlisted = false;
		event.shortlist_count -= 1;

		await team.save();

		return res.status(200).json({
			success: true,
			message: "Rollbacked team!",
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			message: "An error occurred.",
		});
	}
};
