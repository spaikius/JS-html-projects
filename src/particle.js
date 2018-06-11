// Class Particle

// Particle constructor
function Particle() 
{
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.h = 0;
  this.colorOffset = 1;
  this.prevPos = this.pos.copy();
}

Particle.prototype.update = function()
{
  this.vel.add(this.acc);
  this.vel.limit(this.maxspeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

// Follow flow
Particle.prototype.follow = function(vectors) 
{
  var x = floor(this.pos.x / scl);
  var y = floor(this.pos.y / scl);
  var index = x + y * cols;
  var force = vectors[index];
  this.applyForce(force);
}

// Increase particle's speed according to flow rate
Particle.prototype.applyForce = function(force) 
{
  this.acc.add(force);
}

Particle.prototype.show = function() {
  stroke(255, this.h, 100, 25); // Neon effect 
  this.h += this.colorOffset;
  if(this.h > 255) this.colorOffset = -1;
  else if(this.h < 0) this.colorOffset = 1;
  strokeWeight(1);
  line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  this.updatePrev();
}

// Remove tailing line when particle is crossing borders
Particle.prototype.updatePrev = function() 
{
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
}

// Set particle's possiotion to oposite side of canvas
// if particticle is crossing borders   
Particle.prototype.edges = function() 
{
  if (this.pos.x > width)
  {
    this.pos.x = 0;
    this.updatePrev();
  }

  if (this.pos.x < 0)
  {
    this.pos.x = width;
    this.updatePrev();
  }

  if (this.pos.y > height)
  {
    this.pos.y = 0;
    this.updatePrev();
  }

  if (this.pos.y < 0)
  {
    this.pos.y = height;
    this.updatePrev();
  }
}