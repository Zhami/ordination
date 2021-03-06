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
	console.log('firstStep:', 'context:name:', this.name);
	accum.first = "firstIsSync";

	next(null, rqst, accum);
}

function secondStep (err, rqst, accum, next) {
	function afterTimeout () {
		accum.second = "secondIsAsync";
		next(null, rqst, accum);
	}

	console.log('secondStep:', 'context:name:', this.name);
	setTimeout(afterTimeout, 1000);
}

function thirdStep (err, rqst, accum, next) {
	console.log('thirdStep:', 'context:name:', this.name);

	// DON'T CALL next()
}


var	steps = [firstStep, secondStep, thirdStep];

var context = {
	name	: 'Context'
};

var seq = new Sequencer(steps, context);

var rqst = {'i am': 'tbd'};

var accum = {};


seq.next(null, rqst, accum);		// call 'next()' to start; first arg is err (which is null)

