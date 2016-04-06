'use strict';

var Particle = Particle || {};

/**
 * Based on http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
 *
 * A particle definition to display as floating snow.
 *
 * @constructor
 * @param {number} width - the width of the display area
 * @param {number} height - the height of the display area
 */
Particle.SnowParticle = function(width, height) {
    return new Particle.Particle(width, height, {
        xVelocity: 0,
        yVelocity: 5,
        xAccel: 0,
        yAccel: 0,
        maxAge: 1500,

        init: function() {
            this.radius = Math.random() * 4 + 2;
            this.density = Math.random() * 25;
            this.updateCount = 0;
        },

        initialPosition: function(x, y) {
            return {
                x: (Math.random() * (1.5 * width)) - (.5 * width),
                y: 0
            }
        },
        updatePosition: function(xAccel, yAccel) {
            this.updateCount++;
            var angle = 0.01 * this.updateCount;
            this.y += Math.cos(angle + this.density) + 1 + this.radius/2;
            this.x += Math.sin(angle) * 2;
        },
        draw: function(ctx) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            ctx.fill();
        }
    })
};

Particle.SnowParticle.DEFAULT_BACKGROUND = 'rgb(107,146,185)';
Particle.SnowParticle.DEFAULT_FREQUENCY = 300;
Particle.SnowParticle.CREATION_DELAY = 15;
