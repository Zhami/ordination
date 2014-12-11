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

function Sequencer (steps, ifError) {
	this.ifError	= ifError;
	this.numSteps	= steps.length;
	this.steps		= steps;
	this.stepIndex	= 0;
	this.passArgs	= [];
}

//===========================
// Public Methods
//===========================

Sequencer.prototype.run = function () {
	var i;
	var numArgs		= arguments.length;
	var passArgs	= this.passArgs;

	for (i = 0; i < numArgs; i +=1) {
		passArgs.push(arguments[i]);
	}

	passArgs.push(this.next.bind(this));

	this.next();
};


Sequencer.prototype.next = function (nextArg) {
	var applyArgs;
	var steps		= this.steps;
	var thisStep;

	if (nextArg instanceof Error) {
		if (this.ifError) {
			applyArgs = this.passArgs;
			applyArgs.pop();
			applyArgs.push(nextArg);
			this.ifError.apply(null, applyArgs);
		}
		return;
	}

	if (this.stepIndex >= this.numSteps) {
console.log("Sequencer: EGADS!!!", "this.stepIndex >= this.numSteps");
		return;
	}

	thisStep = this.steps[this.stepIndex];
	this.stepIndex += 1;
	thisStep.apply(null, this.passArgs);
};

