let particles = [];

let r = 50;
let r2 = 60;
let r3 = window.innerHeight/4;

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
let secondBlobTranslate = -40;

let blobWhiteAlpha = 128;
let blobPinkAlpha = 114;
let secondSceneBlobAlpha = 0;

let scene2Load = false;
let enableSpaceBar = false;
let deleteTextInstructions = false;
let deleteBlobs = false;
let backgroundAlpha = 0;

let currentR = 139;
let currentG = 195;
let currentB = 74;

let currentHovered;

let drumsButton;
let melodyButton;
let synthButton;
let vocalButton;

let drumsOpen = false;
let melodyOpen = false;
let synthOpen = false;
let vocalOpen = false;

let melodyState = false;
let drumsState = false;
let synthState = false;
let vocalState = false;

let backtoMenuEnable = false;

let sliderMenuControllerOp = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for(let i = 0;i<window.innerWidth/15;i++){
    particles.push(new Particle());
  }

  melodyButton = new customButton(-r3,  -45, "Melody");
  synthButton = new customButton(r3, -45, "Synth");
  drumsButton = new customButton(0, -r3- 45, "Drums");
  vocalButton = new customButton(0, r3 - 45, "Vocals");
}

function draw() {
  r3 = window.innerHeight/4;
  resizeCanvas(window.innerWidth, window.innerHeight);
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }

  background(currentR, currentG, currentB, backgroundAlpha);

  if (deleteBlobs) {
    backgroundAlpha = lerp(backgroundAlpha, 125, 0.3);
    secondSceneBlobAlpha = lerp(secondSceneBlobAlpha, 100, 0.050);
    secondBlobTranslate = lerp(secondBlobTranslate, 0, 0.1);
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

  if(deleteBlobs) {
    push();
      translate(0, secondBlobTranslate);
      //draw shape:
      push();
        translate(width/2, height/2 - 50);
        noFill();
        fill(55, 71, 79,secondSceneBlobAlpha);    // color
        beginShape();
          for (let a=0; a<TWO_PI;a+=TWO_PI/vertices_amount) {
            let x = r3*sin(a);
            let y = r3*cos(a);

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

    melodyButton.draw();
    synthButton.draw();
    vocalButton.draw();
    drumsButton.draw();

    melodyButton.hover();
    synthButton.hover();
    vocalButton.hover();
    drumsButton.hover();

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

  if (dawn_synth.loaded && beginning_synth.loaded && shimmer_synth.loaded && dawn_drums.loaded && beginning_drums.loaded && shimmer_drums.loaded && dawn_vocals.loaded && beginning_vocals.loaded && shimmer_vocals.loaded && dawn_bass.loaded && beginning_bass.loaded && shimmer_bass.loaded && dawn_arp.loaded && beginning_arp.loaded && shimmer_arp.loaded && dawn_piano.loaded && beginning_piano.loaded && shimmer_piano.loaded) {
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
          dawn_synth.start();
          beginning_synth.start();
          shimmer_synth.start();

          dawn_drums.start();
          beginning_drums.start();
          shimmer_drums.start();

          dawn_vocals.start();
          beginning_vocals.start();
          shimmer_vocals.start();

          dawn_bass.start();
          beginning_bass.start();
          shimmer_bass.start();

          dawn_arp.start();
          beginning_arp.start();
          shimmer_arp.start();

          dawn_piano.start();
          beginning_piano.start();
          shimmer_piano.start();

          playing = true;
        }

        if (drumsOpen === true) {
          renderSliderController('drums');
        }
        if (melodyOpen === true) {
          renderSliderController('drums');
        }
        if (synthOpen === true) {
          renderSliderController('drums');
        }
        if (vocalOpen === true) {
          renderSliderController('drums');
        }
      }
    }

    if (backtoMenuEnable) {
      sliderMenuControllerOp = lerp(sliderMenuControllerOp, -10, 0.7);
      console.log(sliderMenuControllerOp);
      if (sliderMenuControllerOp < 2) {
        drumsOpen = false;
        melodyOpen = false;
        synthOpen = false;
        vocalOpen = false;
        backtoMenuEnable = false;
      }
    }
  }
}

function renderSliderController(type) {
  sliderMenuControllerOp = lerp(sliderMenuControllerOp, 230, 0.1);

  if (drumsOpen || melodyOpen || synthOpen || vocalOpen) {
    changeNavBar();
  }

  if (drumsOpen) {
    push();
      push();
        fill(84, 110, 122,sliderMenuControllerOp);
        rect(0,0,window.innerWidth, window.innerHeight);
        push();
          fill('#ffde03');
          textSize(36);
          textFont('Amatic SC');
          textAlign(CENTER);
          text('Drums', window.innerWidth/2, window.innerHeight/2-r3-45);
        pop();
      pop();
    pop();
  }
  if (melodyOpen) {
    push();
      push();
        fill(171, 71, 188,sliderMenuControllerOp);
        rect(0,0,window.innerWidth, window.innerHeight);
        push();
          fill('#ffde03');
          textSize(36);
          textFont('Amatic SC');
          textAlign(CENTER);
          text('Melody', window.innerWidth/2, window.innerHeight/2-r3-45);
        pop();
      pop();
    pop();
  }
  if (synthOpen) {
    push();
      push();
        fill(117, 117, 117,sliderMenuControllerOp);
        rect(0,0,window.innerWidth, window.innerHeight);
        push();
          fill('#ffde03');
          textSize(36);
          textFont('Amatic SC');
          textAlign(CENTER);
          text('Synths', window.innerWidth/2, window.innerHeight/2-r3-45);
        pop();
      pop();
    pop();
  }
  if (vocalOpen) {
    push();
      push();
        fill(1,87,155,sliderMenuControllerOp);
        rect(0,0,window.innerWidth, window.innerHeight);
        push();
          fill('#ffde03');
          textSize(36);
          textFont('Amatic SC');
          textAlign(CENTER);
          text('Vocals', window.innerWidth/2, window.innerHeight/2-r3-45);
        pop();
      pop();
    pop();
  }
}
