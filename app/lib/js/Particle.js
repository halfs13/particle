'use strict';

var Particle = Particle || {};
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

Particle.Particle.prototype.update = function() {
    this.updateHandler(this.xAccel, this.yAccel);
    this.age++;
};

Particle.Particle.prototype.draw = function(ctx) {
    this.drawHandler(ctx);
};

Particle.Particle.prototype.needsRemoval = function() {
    return (this.age > this.maxAge);
}
