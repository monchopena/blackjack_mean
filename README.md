# Blackjack MEAN

![alt tag](https://raw.githubusercontent.com/monchopena/blackjack_mean/master/client/app/images/blackjack.gif)

This is the Beta. Please don't use this in a production environment.

In this project I use these technologies: MongoDB, Express.js, Angular.js and Node.js

<a href="http://46.101.15.22:91">Live preview</a>

## Instalation

```sh
$ git clone <repo URL>
```

## Server

Dependences

- Access to a MongoDB database. 

[Configuration file:](server/app.js#L15)

```
mongoose.connect('mongodb://localhost:27017/blackjack');
```

- Node.js

- npm

```sh
$ cd client
$ npm install
$ node bin/www
```

- Modules

[See all dependencies]:(server/package.json)

## Client

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

- Build & development

Run `grunt` for building and `grunt serve` for preview.

- Testing

Running `grunt test` will run the unit tests with karma.

## Database Structure

### User

[Users model]:(server/models/user.js)

Sample:

```
{
	"_id" : ObjectId("56164ab2e31584f50dad6da5"),
	"username" : "moncho",
	"matches" : [
		ObjectId("56164ab6e31584f50dad6da6"),
		ObjectId("56168cbe1c38ad4710e519f5"),
		ObjectId("56168cef1c38ad4710e519f8"),
		ObjectId("56169b2e1c38ad4710e519fb")
	],
	"lost" : 2,
	"won" : 0,
	"created" : ISODate("2015-10-08T10:51:30.028Z"),
	"__v" : 0
}
```

### Match

[Matches model]:(server/models/match.js)

Sample:

```
{
	"_id" : ObjectId("56169b2e1c38ad4710e519fb"),
	"hands" : [
		ObjectId("56169b2e1c38ad4710e519fc"),
		ObjectId("56169b631c38ad4710e519fd"),
		ObjectId("56169bce1c38ad4710e519fe"),
		ObjectId("56169bdb1c38ad4710e519ff"),
		ObjectId("56169e351c38ad4710e51a00"),
		ObjectId("56169e3f1c38ad4710e51a01"),
		ObjectId("56169e4c1c38ad4710e51a02"),
		ObjectId("56169e5b1c38ad4710e51a03"),
		ObjectId("56169e621c38ad4710e51a04")
	],
	"score_human" : 4,
	"score_computer" : 5,
	"best" : 10,
	"finished" : 0,
	"created" : ISODate("2015-10-08T16:34:54.490Z"),
	"__v" : 0,
	"latest_hand" : ObjectId("56169e621c38ad4710e51a04")
}
```

### Hands

[Hands model]:(server/models/hand.js)

Sample:

```
{
	"_id" : ObjectId("5616c59a1c38ad4710e51a06"),
	"turn" : 3,
	"finished" : 0,
	"hand_human" : [
		{
			"img" : "9_of_spades.png",
			"suit" : "spades",
			"number" : 9
		}
	],
	"hand_computer" : [
		{
			"img" : "queen_of_hearts2.png",
			"suit" : "hearts",
			"number" : 12
		},
		{
			"img" : "6_of_diamonds.png",
			"suit" : "diamonds",
			"number" : 6
		}
	],
	"deck" : [
		{
			"img" : "queen_of_hearts2.png",
			"suit" : "hearts",
			"number" : 12
		},
		...

	],
	"created" : ISODate("2015-10-08T19:35:54.220Z"),
	"__v" : 0
}
```

## Routes in Server

[All routes](server/routes/blackjack.js)




