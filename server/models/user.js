var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username : String,
	created: { type: Date, default: Date.now },
	won: { type: Number, default: 0 },
	lost: { type: Number, default: 0 },
	matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]
});
