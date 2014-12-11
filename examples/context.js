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
	console.log('firstIsSync:', 'context:name:', this.name);
	accum.push("firstIsSync");

	next();
}

function secondIsAsync (rqst, accum, next) {
	console.log('secondIsAsync:', 'context:name:', this.name);
	accum.push("secondIsAsync");

	setTimeout(next, 1000);
}

function thirdIsFinal (rqst, accum, next) {
	console.log('thirdIsFinal:', 'context:name:', this.name);

	// DON'T CALL next()
}


var	steps = [firstIsSync, secondIsAsync, thirdIsFinal];

var context = {
	name	: 'Context'
};

var seq = new Sequencer(steps, context);

var rqst = {'i am': 'tbd'};

var accum = [];



seq.run(rqst, accum);

