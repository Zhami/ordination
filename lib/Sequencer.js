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

exports = module.exports = Possible;

//===========================
// module globals
//===========================

var EventEmitter	= require('events').EventEmitter;
var inherits		= require('util').inherits;


//======================================
// Constructor
//======================================

function Sequencer (steps) {
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

Sequencer.prototype.next = function () {
	var steps		= this.steps;
	var thisStep;

	if (this.stepIndex >= this.numSteps) {
cosnole.log("Sequencer: EGADS!!!", "this.stepIndex >= this.numSteps");
		return;
	}

	thisStep = this.steps[this.stepIndex];
	this.stepIndex += 1;
	thisStep.apply(null, this.passArgs);
};

