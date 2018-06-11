// Perlin noice flow flied ...
// https://en.wikipedia.org/wiki/Perlin_noise

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var particlesNum = 5000;
var flowfield;

var cheight = window.innerHeight;
var cwidth = window.innerWidth;


function setup() 
{
  createCanvas(cwidth, cheight);

  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < particlesNum; i++) particles[i] = new Particle();

  background(0);
}

function draw() 
{
  var yoff = 0;
  for (var y = 0; y < rows; y++) 
  {
    var xoff = 0;

    for (var x = 0; x < cols; x++) 
    {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.00005;
  }

  for (var i = 0; i < particles.length; i++) 
  {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}