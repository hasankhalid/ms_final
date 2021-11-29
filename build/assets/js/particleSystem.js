class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(2,5);
    this.xSpeed = random(-1,1.5);
    this.ySpeed = random(-1,1.5);
    this.opacity = random(0.3,0.8);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(206,147,216,' + this.opacity + ')');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}
