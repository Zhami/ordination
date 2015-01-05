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

function firstStep (err, rqst, accum, next) {
	console.log('firstStep:', 'rqst:', rqst);
	accum.push("firstIsSync");

	next(null, rqst, accum);
}

function secondStep (err, rqst, accum, next) {
	console.log('secondStep:', 'rqst:', rqst);

	function afterTimeout () {
		accum.push("secondIsAsync");
		next(null, rqst, accum);
	}

	setTimeout(afterTimeout, 1000);
}

function thirdStep (err, rqst, accum, next) {
	console.log('thirdStep:', 'accum:', accum);

	// DON'T CALL next()
}

function ifError (err, rqst, accum) {
	console.log('had an error:', err, 'rqst:', rqst, 'accum:', accum);
}

var	steps = [firstStep, secondStep, thirdStep];

var seq = new Sequencer(steps, ifError);

var rqst = {'i am': 'the request'};

var accum = [];


seq.next(null, rqst, accum);		// call 'next()' to start; first arg is err (which is null)

