//==============================
// (c) 2014 Envisix Labs
//
// License: MIT
// Author: Stuart Malin
// stuart [at] envisixlabs [dot] com
//==============================

"use strict";

var ordination		= require('..');

var	Sequencer		= ordination.Sequencer;

function firstIsSync (rqst, accum, next) {
	console.log('firstIsSync:', 'rqst:', rqst);
	accum.push("firstIsSync");

	next();
}

function secondIsAsync (rqst, accum, next) {
	console.log('secondIsAsync:', 'rqst:', rqst);
	accum.push("secondIsAsync");

	setTimeout(next, 1000);
}

function thirdIsFinal (rqst, accum, next) {
	console.log('thirdIsFinal:', 'accum:', accum);

	// DON'T CALL next()
}


var	steps = [firstIsSync, secondIsAsync, thirdIsFinal];

var seq = new Sequencer(steps);

var rqst = {'i am': 'tbd'};

var accum = [];


seq.run(rqst, accum);

