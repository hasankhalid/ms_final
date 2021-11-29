let particles = [];

let r = 50;
let r2 = 60;
let x_off = 1000,y_off = 1000,z_off = 1000;
let vertices_amount = 200;

let px_offset = r/2;    // amplitude
let NOISE_SCALE = 175;  // the higher the softer

let Z_SPEED = .007; // noise change per frame

let X_SPEED = 0;
let Y_SPEED = 0;

let MOUSE_FORCE = -2;

let loadingText = "Loading sounds";
let continueText = "Press spacebar to continue";
let soundsLoaded = false;

let loadingOpacity = 255;
let loadedOpacity = 0;

let blobTranslate = 0;
let blobWhiteAlpha = 128;
let blobPinkAlpha = 114;

let scene2Load = false;
let enableSpaceBar = false;
let deleteTextInstructions = false;
let deleteBlobs = false;
let backgroundAlpha = 0;

let currentR = 139;
let currentG = 195;
let currentB = 74;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for(let i = 0;i<window.innerWidth/15;i++){
    particles.push(new Particle());
  }
}

function draw() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }

  background(currentR, currentG, currentB, backgroundAlpha);

  if (deleteBlobs) {
    backgroundAlpha = lerp(backgroundAlpha, 125, 0.3);
  }


  if(!deleteBlobs) {
    push();
      translate(0, blobTranslate);
      // draw shape:
      push();
        translate(width/2, height/2 - 50);
        noFill();
        fill(255,255,255,blobWhiteAlpha);    // color
        beginShape();
          for (let a=0; a<TWO_PI;a+=TWO_PI/vertices_amount) {
            let x = r2*sin(a);
            let y = r2*cos(a);

            let new_x = x + (
                        noise(
                ((x_off+x)/NOISE_SCALE),
                ((y_off+y)/NOISE_SCALE),
                       z_off) * px_offset * sin(a));

            let new_y = y + (
                        noise(
                ((x_off+x)/NOISE_SCALE),
                ((y_off+y)/NOISE_SCALE),
                       z_off) * px_offset * cos(a))
            vertex(new_x,new_y);
          }
        endShape();
      pop();

      // draw shape:
      push();
        translate(width/2, height/2 - 50);
        noStroke();
        fill(233, 30, 99, blobPinkAlpha);    // color
        beginShape();
          for (let a=0; a<TWO_PI;a+=TWO_PI/vertices_amount) {
            let x = r*sin(a);
            let y = r*cos(a);

            let new_x = x + (
                        noise(
                ((x_off+x)/NOISE_SCALE),
                ((y_off+y)/NOISE_SCALE),
                       z_off) * px_offset * sin(a));

            let new_y = y + (
                        noise(
                ((x_off+x)/NOISE_SCALE),
                ((y_off+y)/NOISE_SCALE),
                       z_off) * px_offset * cos(a))
            vertex(new_x,new_y);
          }
        endShape();
      pop();
    pop();
  }

  // update NOISE offsets
  z_off += Z_SPEED;
  x_off += X_SPEED;
  y_off += Y_SPEED;

  if (!soundsLoaded) {
    if (loadingOpacity < 255) {
      loadingOpacity = loadingOpacity + 10;
    }
    if (loadedOpacity > 0) {
      loadedOpacity = loadedOpacity - 10;
    }
  }
  else {
    if (loadingOpacity > 0) {
      loadingOpacity = loadingOpacity - 10;
    }
    if (!scene2Load) {
      if (loadedOpacity < 255) {
        loadedOpacity = loadedOpacity + 10;
      }
    }
  }

  if(!deleteTextInstructions) {
    push();
      textSize(16);
      translate(width/2, height/2 + 55);
      textAlign(CENTER);
      fill(255, 222, 3, loadingOpacity);
      text(loadingText, 0, 0);
    pop();

    push();
      translate(0, -blobTranslate);
      textSize(16);
      translate(width/2, height/2 + 55);
      textAlign(CENTER);
      fill(255, 222, 3, loadedOpacity);
      text(continueText, 0, 0);
    pop();
  }


  if (player1.loaded && player2.loaded) {
    soundsLoaded = true;
  }

//  console.log(player1.loaded);
  if (soundsLoaded) {
    if (keyIsPressed) {
      enableSpaceBar = true;
    }
    if (enableSpaceBar) {
      if (keyCode === 32) {
        blobTranslate = lerp(blobTranslate, -20, 0.1);
        blobWhiteAlpha = lerp(blobWhiteAlpha, 0, 0.1);
        blobPinkAlpha = lerp(blobPinkAlpha, 0, 0.1);
        scene2Load = true;
        loadedOpacity = lerp(loadedOpacity, 0, 0.2);

        if (loadedOpacity < 0.02) {
          deleteTextInstructions = true;
        }

        if (blobWhiteAlpha < 0.03 && blobPinkAlpha < 0.03) {
          deleteBlobs = true;
        }

        if (!playing) {
          player1.start();
          player2.start();
          playing = true;
        }
      }
    }
  }
}
