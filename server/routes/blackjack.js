var express = require('express');
var router = express.Router();

var async = require('async');

var _ = require('underscore');

var User = require('../models/user');
var Match = require('../models/match');
var Hand = require('../models/hand');

var cards= [
	{ "number": 2, "suit": "diamonds", "img": "2_of_diamonds.png" },
	{ "number": 2, "suit": "clubs", "img": "2_of_clubs.png"},
	{ "number": 2, "suit": "hearts", "img": "2_of_hearts.png" },
	{ "number": 2, "suit": "spades", "img": "2_of_spades.png" },
	{ "number": 3, "suit": "diamonds", "img": "3_of_diamonds.png" },
	{ "number": 3, "suit": "clubs", "img": "3_of_clubs.png" },
	{ "number": 3, "suit": "hearts", "img": "3_of_hearts.png" },
	{ "number": 3, "suit": "spades", "img": "3_of_spades.png" },
	{ "number": 4, "suit": "diamonds", "img": "4_of_diamonds.png" },
	{ "number": 4, "suit": "clubs", "img": "4_of_clubs.png" },
	{ "number": 4, "suit": "hearts", "img": "4_of_hearts.png" },
	{ "number": 4, "suit": "spades", "img": "4_of_spades.png" },
	{ "number": 5, "suit": "diamonds", "img": "5_of_diamonds.png" },
	{ "number": 5, "suit": "clubs", "img": "5_of_clubs.png" },
	{ "number": 5, "suit": "hearts", "img": "5_of_hearts.png" },
	{ "number": 5, "suit": "spades", "img": "5_of_spades.png" },
	{ "number": 6, "suit": "diamonds", "img": "6_of_diamonds.png" },
	{ "number": 6, "suit": "clubs", "img": "6_of_clubs.png" },
	{ "number": 6, "suit": "hearts", "img": "6_of_hearts.png" },
	{ "number": 6, "suit": "spades", "img": "6_of_spades.png" },
	{ "number": 7, "suit": "diamonds", "img": "7_of_diamonds.png" },
	{ "number": 7, "suit": "clubs", "img": "7_of_clubs.png" },
	{ "number": 7, "suit": "hearts", "img": "7_of_hearts.png" },
	{ "number": 7, "suit": "spades", "img": "7_of_spades.png" },
	{ "number": 8, "suit": "diamonds", "img": "8_of_diamonds.png" },
	{ "number": 8, "suit": "clubs", "img": "8_of_clubs.png" },
	{ "number": 8, "suit": "hearts", "img": "8_of_hearts.png" },
	{ "number": 8, "suit": "spades", "img": "8_of_spades.png" },
	{ "number": 9, "suit": "diamonds", "img": "9_of_diamonds.png" },
	{ "number": 9, "suit": "clubs", "img": "9_of_clubs.png" },
	{ "number": 9, "suit": "hearts", "img": "9_of_hearts.png" },
	{ "number": 9, "suit": "spades", "img": "9_of_spades.png" },
	{ "number": 10, "suit": "diamonds", "img": "10_of_diamonds.png" },
	{ "number": 10, "suit": "clubs", "img": "10_of_clubs.png" },
	{ "number": 10, "suit": "hearts", "img": "10_of_hearts.png" },
	{ "number": 10, "suit": "spades", "img": "10_of_spades.png" },
	{ "number": 11, "suit": "diamonds", "img": "jack_of_diamonds2.png" },
	{ "number": 11, "suit": "clubs", "img": "jack_of_clubs2.png" },
	{ "number": 11, "suit": "hearts", "img": "jack_of_hearts2.png" },
	{ "number": 11, "suit": "spades", "img": "jack_of_spades2.png" },
	{ "number": 12, "suit": "diamonds", "img": "queen_of_diamonds2.png" },
	{ "number": 12, "suit": "clubs", "img": "queen_of_clubs2.png" },
	{ "number": 12, "suit": "hearts", "img": "queen_of_hearts2.png" },
	{ "number": 12, "suit": "spades", "img": "queen_of_spades2.png" },
	{ "number": 13, "suit": "diamonds", "img": "king_of_diamonds2.png" },
	{ "number": 13, "suit": "clubs", "img": "king_of_clubs2.png" },
	{ "number": 13, "suit": "hearts", "img": "king_of_hearts2.png" },
	{ "number": 13, "suit": "spades", "img": "king_of_spades2.png" },
	{ "number": 14, "suit": "diamonds", "img": "ace_of_diamonds.png" },
	{ "number": 14, "suit": "clubs", "img": "ace_of_clubs.png" },
	{ "number": 14, "suit": "hearts", "img": "ace_of_hearts.png" },
	{ "number": 14, "suit": "spades", "img": "ace_of_spades.png" },
];

router.get('/tests', function(req, res) {

  var shuffle_cards = _.shuffle(cards);

  res.json(shuffle_cards);

});

router.post('/login', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];
  var get_blackjack='';

  async.series([

  	function(next) {
  		
  		if (typeof req.body.username != 'undefined' && req.body.username != '') {
  			
  			User.findOne( { username: req.body.username }, function(err, blackjack) {
			
			  if (err) {
			    error_message = err;
  			    error_code = 2;
			    next();
			  } else {
				 get_blackjack=blackjack;
			     //console.log('get_blackjack: '+get_blackjack);
			     next();
			  }

			});
  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	},
		
	function(next) {
		if (get_blackjack) {
			all_result=get_blackjack._id;
			next();
		} else {
			var u = new User;
			u.username=req.body.username;
			u.save(function(err){
			    if (err) {
			      error_message='Error saving';
  			      error_code=3;
			      next();
			    } else {
			      all_result=u._id;
			      next();
			    }
			});
			
		}
	}

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/dashboard', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];

  async.series([

  	function(next) {
  		
  		if (typeof req.body.id != 'undefined' && req.body.id != '') {
  			
  			User.findById( req.body.id, function(err, blackjack) {
			
			  if (err) {
			    error_message = err;
  			    error_code = 2;
			    next();
			  } else {
				 all_result=blackjack;
			     next();
			  }

			}).populate('matches', null, { finished: 0 });

  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	}

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});


router.post('/newmatch', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];
  
  var id_user='';
  var id_match='';
  var get_match;
  var id_hand='';
  var get_hand;

  async.series([

  	function(next) {
  		
  		if (typeof req.body.best != 'undefined' && req.body.best != '' &&
  			typeof req.body.id_user != 'undefined' && req.body.id_user != '') {
  			
  			User.findById( req.body.id_user, function(err, blackjack) {
			
			  if (err) {
			    error_message = err;
  			    error_code = 2;
			    next();
			  } else {
				 id_user=blackjack._id;
			     next();
			  }

			});
  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	},

  	function(next) {
  		if (id_user !== '') {
  			//then new match 
  			var m = new Match;
			m.best = req.body.best;
			m.save(function(err){
			    if (err) {
			      error_message='Error saving';
  			      error_code=4;
			      next();
			    } else {
			      all_result = m._id;
			      id_match = m._id;
			      get_match=m;
			      next();
			    }
			});
  		} else {
  			error_message='No user';
  			error_code=3;
			next();
  		}
    },

  	function(next) {
  		if (id_user !== '' && id_match !== '') {
  			User.findByIdAndUpdate( id_user,  { $push: { matches: id_match } }, function(err, user){
  				if (err) {
			      error_message='Error updating';
  			      error_code=6;
			      next();
			    } else {
			      all_result = user._id;
			      next();
			    }
			});

  		} else {
  			error_message='No match';
  			error_code=5;
			next();
  		}
    },

    function(next) {
    	if (error_code == null) {
    		//Add hand
    		var shuffle_cards = _.shuffle(cards);
    		var h = new Hand;
			h.deck = shuffle_cards;
			h.hand_computer = [ shuffle_cards[0], shuffle_cards[2] ];
			h.hand_human = [ shuffle_cards[1] ];
			h.save(function(err){
			    if (err) {
			      error_message='Error saving hand';
  			      error_code=7;
			      next();
			    } else {
			      all_result = h._id;
			      id_hand = h._id;
			      get_hand=h;
			      next();
			    }
			});

    	} else {
    		//nothing to do here
    		next();
    	}
    	
    },

    function(next) {
  		if (id_hand !== '' && id_match !== '') {
  			Match.findByIdAndUpdate( id_match,  { $push: { hands: id_hand }, latest_hand: id_hand }, function(err, match){
  				if (err) {
			      error_message='Error updating';
  			      error_code=9;
			      next();
			    } else {
			      all_result = match._id;
			      next();
			    }
			});

  		} else {
  			error_message='No hand';
  			error_code=8;
			next();
  		}
    },

    function(next) {
    	if (error_code == null) {
    		all_result={ id_user: id_user, id_match: id_match, id_hand: id_hand};
    		next();
    	} else {
    		//nothing to do here
    		next();
    	}
    	
    }

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/hand', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];

  async.series([

  	function(next) {
  		
  		if (typeof req.body.id_hand != 'undefined' && req.body.id_hand != '') {
  			
  			Hand.findById( req.body.id_hand, function(err, hand) {
			
			  if (err) {
			    error_message = err;
  			    error_code = 2;
			    next();
			  } else {
				 all_result=hand;
			     next();
			  }

			});
  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	}

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/match', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];

  async.series([

  	function(next) {
  		
  		if (typeof req.body.id_match != 'undefined' && req.body.id_match != '') {
  			
  			Match.findById( req.body.id_match, function(err, match) {
			
			  if (err) {
			    error_message = err;
  			    error_code = 2;
			    next();
			  } else {
				 all_result=match;
			     next();
			  }

			});
  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	}

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/updatehand', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];

  async.series([

  	function(next) {
  		
  		if (typeof req.body.id_hand != 'undefined' && req.body.id_hand != '' &&
  			typeof req.body.card != 'undefined' && req.body.card != '' &&
  			typeof req.body.type != 'undefined' && req.body.type != '') {
  			
  			var query={ $push: { hand_human: req.body.card }, $inc: { turn: 1 } };

  			if (req.body.type == 'computer') {
  				query={ $push: { hand_computer: req.body.card }, $inc: { turn: 1 } };
  			}

  			Hand.findByIdAndUpdate( req.body.id_hand, query, function(err, hand){
  				if (err) {
			      error_message='Error updating';
  			      error_code=2;
			      next();
			    } else {
			      all_result = hand._id;
			      next();
			    }
			});

  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	}

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/finishhand', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=0;
  
  var get_hand;
  var get_match;

  var finish_match=0;

  async.series([

  	function(next) {
  		
  		if (typeof req.body.id_hand != 'undefined' && req.body.id_hand != '' &&
  			typeof req.body.id_match != 'undefined' && req.body.id_match != '' &&
  			typeof req.body.id_user != 'undefined' && req.body.id_user != '' &&
  			typeof req.body.type != 'undefined' && req.body.type != '') {
  			

  			Hand.findByIdAndUpdate( req.body.id_hand, { finished: 1 }, function(err, hand){
  				if (err) {
			      error_message='Error updating';
  			      error_code=2;
			      next();
			    } else {
			      get_hand = hand;
			      next();
			    }
			});

  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	},

  	function(next) {
    	if (error_code == null) {

    		var query={ $inc: { score_human: 1 } };

  			if (req.body.type == 'computer') {
  				query={ $inc: { score_computer: 1 } };
  			}

  			Match.findByIdAndUpdate( req.body.id_match, query, { 'new': true }, function(err, match) {
  				if (err) {
			      error_message='Error updating';
  			      error_code=2;
			      next();
			    } else {
			      get_match = match;
			      next();
			    }
			});
    	} else {
    		//nothing to do here
    		next();
    	}
    },

    function(next) {
    	if (error_code == null) {
    		console.log('get_match.best: '+get_match.best);
    		console.log('get_match.score_human: '+get_match.score_human);
    		console.log('get_match.score_computer: '+get_match.score_computer);
    		if (get_match.score_computer == get_match.best || get_match.best === get_match.score_human) {
    			Match.findByIdAndUpdate( req.body.id_match, { finished: 1 }, function(err, match) {
	  				if (err) {
				      error_message='Error updating';
	  			      error_code=2;
				      next();
				    } else {
				      finish_match=1;
				      next();
				    }
				});
    		} else {
    			next();
    		}
    	} else {
    		//nothing to do here
    		next();
    	}
    },

    function(next) {
    	if (finish_match == 1) {
    		//user statics
    		var query={ $inc: { won: 1 } };
  			if (req.body.type == 'computer') {
  				query={ $inc: { lost: 1 } };
  			}
    		User.findByIdAndUpdate( req.body.id_user, query, function(err, user) {
  				if (err) {
			      error_message='Error updating';
  			      error_code=2;
			      next();
			    } else {
			      all_result=1;
			      next();
			    }
			});
    	} else {
    		//nothing to do here
    		next();
    	}
    }

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

router.post('/newhand', function(req, res) {

  var error_message='';
  var error_code=null;
  var all_result=[];
  var next_id_hand;
  
  async.series([

  	function(next) {
  		
  		if (typeof req.body.id_match != 'undefined' && req.body.id_match != '') {
  			//Add hand
    		var shuffle_cards = _.shuffle(cards);
    		var h = new Hand;
			h.deck = shuffle_cards;
			h.hand_computer = [ shuffle_cards[0], shuffle_cards[2] ];
			h.hand_human = [ shuffle_cards[1] ];
			h.save(function(err){
			    if (err) {
			      error_message='Error saving hand';
  			      error_code=7;
			      next();
			    } else {
			      next_id_hand = h._id;
			      next();
			    }
			});
  		} else {
  			error_message='No params';
  			error_code=1;
			next();
  		}

  	},

  	function(next) {
    	if (error_code == null) {

  			Match.findByIdAndUpdate( req.body.id_match, { $push: { hands: next_id_hand }, latest_hand: next_id_hand }, function(err, match){
  				if (err) {
			      error_message='Error updating';
  			      error_code=2;
			      next();
			    } else {
			      all_result = next_id_hand;
			      next();
			    }
			});
    	} else {
    		//nothing to do here
    		next();
    	}
    }

	], function(err) {

		var res_json={"result": all_result, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message};
		console.log(JSON.stringify(res_json, null, " "));
		res.json(
			res_json
		);
	});

});

module.exports = router;