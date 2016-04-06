'use stict';

var Particle = Particle || {};
Particle.ParticleEngine = function(config) {
    this.canvas = config.canvas;
    this.Particle = config.Particle;
    this.particleCount = config.particleCount || 10;
    this.particlesPerTick = 2;
    this.background = config.background;

    this.init();
    return this;
};

Particle.ParticleEngine.prototype.init = function() {
    if(this.background) {
        $(this.canvas).css('background', this.background);
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.canvas.width = $(this.canvas).width();
    this.canvas.height = $(this.canvas).height();
    this.width = this.canvas.width;//
    this.height = this.canvas.height;//$(this.canvas).height();

    this.creationDelay = 0;
};

/**
 * Starts the rendering loop
*/
Particle.ParticleEngine.prototype.start = function() {
    this.running = true;
    window.requestAnimationFrame(this.loop.bind(this));
};

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

Particle.ParticleEngine.prototype.stop = function() {
    this.running = false;
};

Particle.ParticleEngine.prototype.removeOld = function() {
    for (var i = 0; i < this.particles.length; i++) {
        if(this.particles[i].needsRemoval()) {
            this.particles.splice(i, 1);
        }
    }
};

Particle.ParticleEngine.prototype.removeAllParticles = function() {
    this.particles = [];
};

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

Particle.ParticleEngine.prototype.toggle = function() {
    if(this.running) {
        this.stop();
    } else {
        this.start();
    }
};
