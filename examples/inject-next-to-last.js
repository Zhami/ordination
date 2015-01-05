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

function first (err, rqst, accum, next) {
	console.log('first:', 'context:name:', this.name);

	seq.injectNextToLast(injected);

	next(null, rqst, accum);
}

function second (err, rqst, accum, next) {
	console.log('second:', 'context:name:', this.name);

	next(null, rqst, accum);
}

function injected (err, rqst, accum, next) {
	function afterTimeout () {
		accum.second = "injected";
		next(null, rqst, accum);
	}

	console.log('injected:', 'context:name:', this.name);
	setTimeout(afterTimeout, 1000);
}

function final (err, rqst, accum, next) {
	console.log('final:', 'context:name:', this.name);

	// DON'T CALL next()
}


var	steps = [first, second, final];

var context = {
	name	: 'Context'
};

var seq = new Sequencer(steps, context);

var rqst = {'i am': 'tbd'};

var accum = {};


seq.next(null, rqst, accum);		// call 'next()' to start; first arg is err (which is null)

