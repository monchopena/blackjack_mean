var mongoose = require('mongoose');

module.exports = mongoose.model('Match', {
	created: { type: Date, default: Date.now },
	finished: { type: Number, default: 0 },
	best: { type: Number, default: 10 },
	score_computer: { type: Number, default: 0 },
	score_human: { type: Number, default: 0 },
	hands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hand'}],
	latest_hand: {type: mongoose.Schema.Types.ObjectId, ref: 'Hand'},
});
