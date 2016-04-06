'use strict';

var Particle = Particle || {};

/**
 * A particle to be rendered by the particleEngine
 * @constructor
 * @param {number} width - the width of the render area
 * @param {number} height - the height of the render area
 * @param {Object} config
 * @param {number} config.xVelocity - the initial horizontal velocity of this type of particle
 * @param {number} config.yVelocity - the initial vertical velocity of this type of particle
 * @param {number} config.xAccel - the horizontal acceleration to apply per tick
 * @param {number} config.yAccel - the vertical acceleration to apply per tick
 * @param {number} config.maxAge - the number of ticks after which to remove this particle
 * @param {function} [config.init] - an optional function to call at the time of creation
 * @param {function} config.initialPosition - a function which returns the initial coordinates of the position
 *      as an object with keys for x and y
 * @param {function} config.updatePosition - a function which handles updating the position of the particle
 * @param {function} config.draw - a function which handles the drawing of the particle to the provided canvas context
*/
Particle.Particle = function(width, height, config) {
    this.initialXVelocity = config.xVelocity;
    this.initialYVelocity = config.yVelocity;
    this.xAccel = config.xAccel;
    this.yAccel = config.yAccel;
    this.maxAge = config.maxAge;

    this.initHander = config.init;
    this.initHandler = config.initialPosition;
    this.updateHandler = config.updatePosition;
    this.drawHandler = config.draw;

    this.init(width, height);
};

/**
 * intializes this particle and calls the configured init and intialPosition functions
 * @param {number} width - the width of the render area
 * @param {number} height - the height of the render area
*/
Particle.Particle.prototype.init = function(width, height) {
    if(this.initHander) {
        this.initHander();
    }
    var position = this.initHandler(width, height);
    this.x = this.oldX = position.x;
    this.y = this.oldY = position.y;
    this.age = 0;
    this.updateHandler(this.initialXVelocity, this.initialYVelocity);
};

/**
 * Increases the age of this particle and calls the update handler
*/
Particle.Particle.prototype.update = function() {
    this.updateHandler(this.xAccel, this.yAccel);
    this.age++;
};

/**
 * handles drawing this particle
*/
Particle.Particle.prototype.draw = function(ctx) {
    this.drawHandler(ctx);
};

/**
 * returns whether or not this element needs removed
 * @return {boolean} whether or not this element needs removed
*/
Particle.Particle.prototype.needsRemoval = function() {
    return (this.age > this.maxAge);
}
