class customButton {
  constructor(xPos, yPos, buttonName) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.buttonName = buttonName;
    this.currentColor = color(255,255,255);
  }

  draw() {
    push();
      textSize(26);
      fill(this.currentColor);
      translate(window.innerWidth/2 + this.xPos, window.innerHeight/2 + this.yPos);
      textFont('Amatic SC');
      textAlign(CENTER);
      text(this.buttonName, 0, 0);
    pop();
  }

  hover() {
    if (mouseX > ((window.innerWidth/2 + this.xPos) - textWidth(this.buttonName)/2) && mouseX < ((window.innerWidth/2 + this.xPos) + textWidth(this.buttonName)/2)) {
      if(mouseY < (window.innerHeight/2 + this.yPos) && mouseY > (window.innerHeight/2 + this.yPos - 30)) {
        if (this.buttonName === "Melody") {
          melodyState = true;
        }
        if (this.buttonName === "Synth") {
          synthState = true;
        }
        if (this.buttonName === "Drums") {
          drumsState = true;
        }
        if (this.buttonName === "Vocals") {
          vocalState = true;
        }

        if(!drumsOpen && !synthOpen && !drumsOpen && !vocalOpen) {
          cursor('pointer');
          this.currentColor = lerpColor(this.currentColor, color(255,222,3), 0.2);
        }

        if(!drumsOpen && !synthOpen && !drumsOpen && !vocalOpen) {
          if (mouseIsPressed) {
            if (this.buttonName === "Melody") {
              melodyOpen = true;
              melody_inputs_container();
            }
            if (this.buttonName === "Synth") {
              synthOpen = true;
              synth_inputs_container();
            }
            if (this.buttonName === "Drums") {
              drumsOpen = true;
              drum_inputs_container();
            }
            if (this.buttonName === "Vocals") {
              vocalOpen = true;
              vocalInputTransition();
            }
          }
        }
      }
      else {
        if (this.buttonName === "Melody") {
          melodyState = false;
        }
        if (this.buttonName === "Synth") {
          synthState = false;
        }
        if (this.buttonName === "Drums") {
          drumsState = false;
        }
        if (this.buttonName === "Vocals") {
          vocalState = false;
        }
      //  console.log(this.stateToChange);
        if (!melodyState && !synthState && !vocalState && !drumsState) {
          cursor('default');
          this.currentColor = lerpColor(this.currentColor, color(255,255,255), 0.2);
        }
      //  cursor('default');
      }
    }
    else {
      if (this.buttonName === "Melody") {
        melodyState = false;
      }
      if (this.buttonName === "Synth") {
        synthState = false;
      }
      if (this.buttonName === "Drums") {
        drumsState = false;
      }
      if (this.buttonName === "Vocals") {
        vocalState = false;
      }
    //  console.log(this.stateToChange);
      if (!melodyState && !synthState && !vocalState && !drumsState) {
        cursor('default');
        this.currentColor = lerpColor(this.currentColor, color(255,255,255), 0.2);
      }
    //  cursor('default');
    }
  }
}
