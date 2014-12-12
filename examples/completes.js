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

function firstIsSync (err, rqst, accum, next) {
	console.log('firstIsSync:', 'rqst:', rqst);
	accum.push("firstIsSync");

	next(null, rqst, accum);
}

function secondIsAsync (err, rqst, accum, next) {
	console.log('secondIsAsync:', 'rqst:', rqst);

	function afterTimeout () {
		accum.push("secondIsAsync");
		next(null, rqst, accum);
	}

	setTimeout(afterTimeout, 1000);
}

function thirdIsFinal (err, rqst, accum, next) {
	console.log('thirdIsFinal:', 'accum:', accum);

	// DON'T CALL next()
}

function ifError (err, rqst, accum) {
	console.log('had an error:', err, 'rqst:', rqst, 'accum:', accum);
}

var	steps = [firstIsSync, secondIsAsync, thirdIsFinal];

var seq = new Sequencer(steps, ifError);

var rqst = {'i am': 'the request'};

var accum = [];


seq.next(null, rqst, accum);		// call 'next()' to start; first arg is err (which is null)

