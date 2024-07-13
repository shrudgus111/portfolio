// by Yiting Liu
// Algorithm from Nature of Code
// library: https://p5js.org/


var ps = [];
var time,
    ptime=0;
var offset;
// var reset=true;
var origin;
var bg=0;


//yellow, pink, blue, green
var colors=['#FFE300','#FF7494','#00E6FF','#89FF47'];
function setup() { 
  createCanvas(windowWidth,windowHeight);
  ps=new ParticleSystem(createVector(width/2,height/2));
  background(0,0,0);
  offset=createVector(random(1000),random(1000));
  origin=createVector(width/2,height/2);
} 
function draw() {
  console.log(bg);
  if(bg%2==0) background(87,6,140); 
  else background(0,0,0,20);
  if (mouseX == pmouseX && mouseY == pmouseY && millis()-ptime>800){
    var step=createVector(noise(offset.x)-.5,noise(offset.y)-.5);
    step.mult(10);
    var pos=p5.Vector.add(origin,step);
    if(pos.x>width) pos.x-=width;
    if(pos.x<0) pos.x+=width;
    if(pos.y>height) pos.y-=height;
    if(pos.y<0) pos.y+=height;
    ps.addParticle(pos,origin);
    origin=pos;
    offset.x+=.01;
    offset.y+=.01;
  }
  
  ps.run();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  bg++;
}

function mouseMoved() {
  var pos=createVector(mouseX,mouseY);
  var ppos=createVector(pmouseX,pmouseY);
  ps.addParticle(pos,ppos);
  ptime=millis();
  
  //reset
  origin=createVector(width/2,height/2);
}

var Particle = function(pos,ppos) {
  this.pos = pos.copy();
  this.col=random(colors);
  this.size=random(5,30);
  this.fill=random([0,1]);
  this.velocity = createVector(0, 0);
  // this.acceleration = createVector(20*random(-1,1), 20*random(-1,1));
  this.acceleration=p5.Vector.sub(ppos,pos);
  // if(this.acceleration.mag()<2){
  //   this.acceleration=this.acceleration.setMag(2);
  // }
  this.acceleration.mult(.02);
  this.offset=createVector(random(0,1000),random(0,1000));
  // this.f=this.acceleration.copy();
  // this.f.normalize();
  // this.f.mult(-.1);
  // console.log("a: "+this.acceleration);
  // console.log("f: "+this.f);


  this.update = function() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.pos.add(createVector(10*(noise(this.offset.x)-.5),10*(noise(this.offset.y)-.5)));
     this.offset.x = this.offset.x + 0.01;
     this.offset.y = this.offset.y + 0.01;
    // var n = noise(xoff) * width;
    this.size=this.size*.95;
    this.acceleration.mult(0);
    if(this.velocity.mag() >1) this.velocity.mult(.95);
    // this.acceleration.add(this.f);
  }

  this.isDead = function() {
    if(this.size<1) return true;
    else return false;
  }

  this.render = function() {
    if(this.fill==1){ noStroke(); fill(this.col) }
    else{ noFill(); stroke(this.col); }
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
var ParticleSystem = function() {
	// this.origin = pos.copy();
	this.particles = [];

  this.addParticle = function(pos,ppos) {
      this.particles.push(new Particle(pos,ppos));
  };

  this.run = function(){
  	for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
      p.render();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  // A function to apply a force to all Particles
//   this.applyForce = function(f){
//     for(var i = 0; i < this.particles.length; i++){
//       this.particles[i].applyForce(f);
//     }
//   };
}