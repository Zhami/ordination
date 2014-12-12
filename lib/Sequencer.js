//==============================
// (c) 2014 Envisix Labs
//
// License: MIT
// Author: Stuart Malin
// stuart [at] envisixlabs [dot] com
//==============================

"use strict";

//===========================
// exports
//===========================

exports = module.exports = Sequencer;

//===========================
// module globals
//===========================

var EventEmitter	= require('events').EventEmitter;
var inherits		= require('util').inherits;


//======================================
// Constructor
//======================================

function Sequencer (steps, opt1, opt2) {
	var ifError;
	var context;

	// One of the options can be an object, which if supplied will be set as the 'this' context on all function invocations.
	// One of the options can be a function, which if supplied will be called if/when an invoked function calls 'next(err)''

	if (typeof opt1 === 'function') {
		ifError = opt1;
	} else if (typeof opt2 === 'function') {
		ifError = opt2;
	}

	if (typeof opt1 === 'object') {
		context = opt1;
	} else if (typeof opt2 === 'object') {
		context = opt2;
	}

	this.context		= context || null;
	this.ifError		= ifError;
	this.nextFunction	= this.next.bind(this);
	this.numSteps		= steps.length;
	this.steps			= steps;
	this.stepIndex		= 0;
	this.passArgs		= [];
}


//===========================
// Private Methods
//===========================



//===========================
// Public Methods
//===========================


Sequencer.prototype.next = function () {
	var applyArgs;
	var err;
	var i;
	var numArgs		= arguments.length;
	var steps		= this.steps;
	var theArgs		= new Array(numArgs);
	var thisStep;

	// capture all arguments
	for (i = 0; i < numArgs; i +=1) {
		theArgs[i] = arguments[i];
	}

	// if an error was supplied and the Sequence has an error handler, invoke it
	if (theArgs[0] && this.ifError) {
		this.ifError.apply(this.context, theArgs);
		return;		// DON'T CONTINUE
	}

	if (this.stepIndex >= this.numSteps) {
console.log("Sequencer: EGADS!!!", "this.stepIndex >= this.numSteps");
		return;
	}

	// invoke next step
	thisStep = this.steps[this.stepIndex];
	this.stepIndex += 1;
	theArgs.push(this.nextFunction);
	thisStep.apply(this.context, theArgs);
};

