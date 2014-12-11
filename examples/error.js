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

function secondHasAsyncError (rqst, accum, next) {
	console.log('secondIsAsync:', 'rqst:', rqst);
	accum.push("secondIsAsync");

	function afterTimeout () {
		next(new Error('Boom!'));
	}

	setTimeout(afterTimeout, 1000);
}

function thirdIsFinal (rqst, accum, next) {
	console.log('thirdIsFinal:', 'accum:', accum);

	// DON'T CALL next()
}

function ifError (rqst, accum, err) {
	console.log('had an error:', err);
	console.log('rqst:', rqst, 'accum:', accum);
}

var	steps = [firstIsSync, secondHasAsyncError, thirdIsFinal];

var seq = new Sequencer(steps, ifError);

var rqst = {'i am': 'tbd'};

var accum = [];


seq.run(rqst, accum);

