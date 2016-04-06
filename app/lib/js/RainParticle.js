'use strict';

var Particle = Particle || {};

/**
 * Based on http://cssdeck.com/labs/neatnait-canvas-rain
 *
 * A particle definition which renders to appear as rain, including a splash
 * affect when hitting the bottom of the display area.
 *
 * @constructor
 * @param {number} width - the width of the display area
 * @param {number} height - the height of the display area
 */
Particle.RainParticle = function(width, height) {
    return new Particle.Particle(width, height, {
        xVelocity: 1,
        yVelocity: -10,
        xAccel: 0,
        yAccel: .15,
        maxAge: 200,

        initialPosition: function(x, y) {
            return {
                x: (Math.random() * (2 * x)) - (.75 * x),
                y: 0
            }
        },
        updatePosition: function(xAccel, yAccel) {
            var deltaX = this.x - this.oldX;
            this.oldX = this.x;
            this.x += 2 * Math.abs(Math.sin(2 * deltaX + xAccel));

            if (this.y > height) {
                var deltaY = this.y - this.oldY;
                this.oldY = height;
                this.y = this.oldY - deltaY * Math.random() * 0.2;
            } else {
                var deltaY = this.y - this.oldY;
                this.oldY = this.y;
                this.y += (yAccel + deltaY);
            }
        },
        draw: function(ctx) {
            ctx.strokeStyle = '#77D';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.oldX, this.oldY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }
    })
};

Particle.RainParticle.DEFAULT_BACKGROUND = '#000';
Particle.RainParticle.DEFAULT_FREQUENCY = 400;
