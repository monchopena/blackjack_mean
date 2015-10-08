var mongoose = require('mongoose');

module.exports = mongoose.model('Hand', {
	created: { type: Date, default: Date.now },
	deck: [],
	hand_computer: [],
	hand_human: [],
	finished: { type: Number, default: 0 },
	turn: { type: Number, default: 3 }
});