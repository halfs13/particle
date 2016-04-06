'use stict';

var Particle = Particle || {};

/**
 * A canvas based engine which handles the updating and rendering of particles
 *
 * @constructor
 * @param {Object} config - configuration of how the engine should behave
 * @param {HTML element} config.canvas - the html canvas element
 * @param {Object} config.Particle - the Particle definition to be rendered
 * @param {number} config.particleCount - the number of particles to display; this may be limited by the maximum
 *      particles per tick and an optional particle.CREATION_DELAY
 * @param {String} config.background - the background to use for this display
*/
Particle.ParticleEngine = function(config) {
    this.canvas = config.canvas;
    this.Particle = config.Particle;
    this.particleCount = config.particleCount || 10;
    this.particlesPerTick = 2;
    this.background = config.background;

    this.init();
    return this;
};

/**
 * initializes the engine and configures the canvas element
 */
Particle.ParticleEngine.prototype.init = function() {
    if(this.background) {
        $(this.canvas).css('background', this.background);
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.canvas.width = $(this.canvas).width();
    this.canvas.height = $(this.canvas).height();
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.creationDelay = 0;
};

/**
 * Starts the rendering loop
*/
Particle.ParticleEngine.prototype.start = function() {
    this.running = true;
    window.requestAnimationFrame(this.loop.bind(this));
};

/**
 * A tick of the render loop. Attempts to add particles then updates the render, removing
 * any particles older than the max age.
*/
Particle.ParticleEngine.prototype.loop = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.addNewParticles();

    for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle.update(particle.xAccel, particle.yAccel);
        particle.draw(this.ctx);
    }
    this.removeOld();

    if(this.running) {
        window.requestAnimationFrame(this.loop.bind(this));
    }
};

/**
 * Attempts to add particles based on the configured desired number of particles
 * taking into account a possible CREATION_DELAY on the Particle type and the max
 * number of particles per tick
*/
Particle.ParticleEngine.prototype.addNewParticles = function() {
    if(this.particles.length < this.particleCount) {
        if(this.Particle.CREATION_DELAY && (this.creationDelay < this.Particle.CREATION_DELAY)) {
            this.creationDelay++;
        } else {
            this.creationDelay = 0;
            var count = this.particleCount - this.particles.length;
            count = count <= this.particlesPerTick ? count : this.particlesPerTick;

            for (var i = 0; i < count; i++) {
                var particle = new this.Particle(this.width, this.height);
                this.particles.push(particle);
            }
        }
    }
}

/**
 * Designates the rendering as stopped
*/
Particle.ParticleEngine.prototype.stop = function() {
    this.running = false;
};

/**
 * Removes any particles which return as needing removed
*/
Particle.ParticleEngine.prototype.removeOld = function() {
    for (var i = 0; i < this.particles.length; i++) {
        if(this.particles[i].needsRemoval()) {
            this.particles.splice(i, 1);
        }
    }
};

/**
 * sets the particles array to empty
*/
Particle.ParticleEngine.prototype.removeAllParticles = function() {
    this.particles = [];
};

/**
 * Handles changing the configured Particle type.
 * @param {Particle} Particle - a particle configuration type
 * @param {String} [background] - an optional new background to set
 * @param {number} [particleCount] - an optional new number of particles to set
*/
Particle.ParticleEngine.prototype.setParticle = function(Particle, background, particleCount) {
    this.stop();
    this.removeAllParticles();
    this.Particle = Particle;
    if(background) {
        this.background = background;
        $(this.canvas).css('background-color', this.background);
    }
    if(particleCount) {
        this.particleCount = particleCount;
    }
    this.start();
};

/**
 * Toggles the state of rendering to start or stop
*/
Particle.ParticleEngine.prototype.toggle = function() {
    if(this.running) {
        this.stop();
    } else {
        this.start();
    }
};
