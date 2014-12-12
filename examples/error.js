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

function secondHasAsyncError (err, rqst, accum, next) {
	console.log('secondIsAsync:', 'rqst:', rqst);
	accum.push("secondIsAsync");

	function afterTimeout () {
		next(new Error('Boom!'), rqst, accum);
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

var	steps = [firstIsSync, secondHasAsyncError, thirdIsFinal];

var seq = new Sequencer(steps, ifError);

var rqst = {'i am': 'the arguments'};

var accum = [];


seq.next(null, rqst, accum);

