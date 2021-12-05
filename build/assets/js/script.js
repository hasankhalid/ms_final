let dawn_synth = new Tone.Player('./assets/music/Dawn/DawnMSSynth.wav').toDestination();
dawn_synth.loop = true;
dawn_synth.volume.value = -20;
let beginning_synth = new Tone.Player('./assets/music/Beginning/QJamMSSynth.wav').toDestination();
beginning_synth.loop = true;
beginning_synth.volume.value = -10;
let shimmer_synth = new Tone.Player('./assets/music/Shimmer/ShimmerMSSynth.wav').toDestination();
shimmer_synth.loop = true;
shimmer_synth.volume.value = -100;

let dawn_drums = new Tone.Player('./assets/music/Dawn/DawnMSKick.wav').toDestination();
dawn_drums.loop = true;
dawn_drums.volume.value = -100;
let beginning_drums = new Tone.Player('./assets/music/Beginning/QJamMSDrums.wav').toDestination();
beginning_drums.loop = true;
beginning_drums.volume.value = -100;
let shimmer_drums = new Tone.Player('./assets/music/Shimmer/ShimmerMSDrums.wav').toDestination();
shimmer_drums.loop = true;
shimmer_drums.volume.value = -100;

let dawn_vocals = new Tone.Player('./assets/music/Dawn/DawnMSVocals.wav').toDestination();
dawn_vocals.loop = true;
dawn_vocals.volume.value = -100;
let beginning_vocals = new Tone.Player('./assets/music/Beginning/QJamMSVocals.wav').toDestination();
beginning_vocals.loop = true;
beginning_vocals.volume.value = -100;
let shimmer_vocals = new Tone.Player('./assets/music/Shimmer/ShimmerMSVocal.wav').toDestination();
shimmer_vocals.loop = true;
shimmer_vocals.volume.value = -100;

let dawn_bass = new Tone.Player('./assets/music/Dawn/DawnMSBass.wav').toDestination();
dawn_bass.loop = true;
dawn_bass.volume.value = -100;
let beginning_bass = new Tone.Player('./assets/music/Beginning/QJamMSBass.wav').toDestination();
beginning_bass.loop = true;
beginning_bass.volume.value = -100;
let shimmer_bass = new Tone.Player('./assets/music/Shimmer/ShimmerMSBass.wav').toDestination();
shimmer_bass.loop = true;
shimmer_bass.volume.value = -100;

let dawn_arp = new Tone.Player('./assets/music/Dawn/DawnMSArp2.wav').toDestination();
dawn_arp.loop = true;
dawn_arp.volume.value = -20;
let beginning_arp = new Tone.Player('./assets/music/Beginning/QJamMSArp.wav').toDestination();
beginning_arp.loop = true;
beginning_arp.volume.value = -10;
let shimmer_arp = new Tone.Player('./assets/music/Shimmer/ShimmerMSArp.wav').toDestination();
shimmer_arp.loop = true;
shimmer_arp.volume.value = -100;

let dawn_piano = new Tone.Player('./assets/music/Dawn/DawnMSArp.wav').toDestination();
dawn_piano.loop = true;
dawn_piano.volume.value = -100;
let beginning_piano = new Tone.Player('./assets/music/Beginning/QJamMSPiano.wav').toDestination();
beginning_piano.loop = true;
beginning_piano.volume.value = -100;
let shimmer_piano = new Tone.Player('./assets/music/Shimmer/ShimmerMSPiano.wav').toDestination();
shimmer_piano.loop = true;
shimmer_piano.volume.value = -100;

let playing = false;

let currentActiveElement;

let granimInstance = new Granim({
    element: '#granim_canvas',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#5B3B8C','#6f4685'],
                ['#551a8b', '#880085'],
                ['#0D47A1', '#1976D2'],
            ]
        }
    }
});

document.getElementById('open_menu').addEventListener('click', function() {
  let full_page = document.getElementById('full_page_navigation');
  full_page.classList.add("animate__animated");
  full_page.classList.remove("fp_inVisible");
  full_page.classList.add("fp_visible");
  full_page.classList.remove("animate__fadeOut");
  full_page.classList.add("animate__fadeIn");
});

document.getElementById('close_menu').addEventListener('click', function() {
  let full_page = document.getElementById('full_page_navigation');
  full_page.classList.remove("fp_visible");
  full_page.classList.remove("animate__fadeIn");
  full_page.classList.add("animate__fadeOut");
  full_page.classList.add("fp_inVisible");
});

document.getElementById('close_slider').addEventListener('click', function() {
  restoreNavBar();
  if (currentActiveElement) {
    removeActiveState(currentActiveElement);
  }
});

function changeNavBar() {
  if (drumsOpen || melodyOpen || synthOpen || vocalOpen) {
    if (!backtoMenuEnable) {
      let open_menu = document.getElementById('open_menu');
      let close_pop_slider = document.getElementById('close_slider');

      let open_menu_add = [''];
      let open_menu_remove = [''];

      let close_menu_remove = [''];
      let close_menu_add = [''];


      open_menu.classList.add("animate__animated");
      close_pop_slider.classList.add("animate__animated");
      open_menu.classList.remove("fp_visible");
      open_menu.classList.add("fp_inVisible");
      close_pop_slider.classList.remove("fp_inVisible");
      close_pop_slider.classList.add("fp_visible");
      open_menu.classList.remove("animate__fadeIn");
      open_menu.classList.add("animate__fadeOut");
      close_pop_slider.classList.remove("animate__fadeOut");
      close_pop_slider.classList.add("animate__fadeIn");
      backtoMenuEnable = false;
    }
  }
}

function restoreNavBar() {
  let open_menu = document.getElementById('open_menu');
  let close_pop_slider = document.getElementById('close_slider');
  backtoMenuEnable = true;
  close_pop_slider.classList.remove("fp_visible");
  close_pop_slider.classList.add("fp_inVisible");
  open_menu.classList.remove("fp_inVisible");
  open_menu.classList.add("fp_visible");
  close_pop_slider.classList.remove("animate__fadeIn");
  close_pop_slider.classList.add("animate__fadeOut");
  open_menu.classList.remove("animate__fadeOut");
  open_menu.classList.add("animate__fadeIn");
}

function vocalInputTransition() {
  let vocal_inputs_cont = document.getElementById('vocal_inputs_container');
  vocal_inputs_cont.classList.remove("fp_inVisible");
  vocal_inputs_cont.classList.add("fp_visible");
  vocal_inputs_cont.classList.remove("animate__fadeOut");
  vocal_inputs_cont.classList.add("animate__fadeIn");
  setCurrentActiveState(vocal_inputs_cont);
}

function drum_inputs_container() {
  let drums_inputs_cont = document.getElementById('drum_inputs_container');
  drums_inputs_cont.classList.remove("fp_inVisible");
  drums_inputs_cont.classList.add("fp_visible");
  drums_inputs_cont.classList.remove("animate__fadeOut");
  drums_inputs_cont.classList.add("animate__fadeIn");
  setCurrentActiveState(drums_inputs_cont);
}

function synth_inputs_container() {
  let synth_inputs_cont = document.getElementById('synth_inputs_container');
  synth_inputs_cont.classList.remove("fp_inVisible");
  synth_inputs_cont.classList.add("fp_visible");
  synth_inputs_cont.classList.remove("animate__fadeOut");
  synth_inputs_cont.classList.add("animate__fadeIn");
  setCurrentActiveState(synth_inputs_cont);
}

function melody_inputs_container() {
  let melody_inputs_cont = document.getElementById('melody_inputs_container');
  melody_inputs_cont.classList.remove("fp_inVisible");
  melody_inputs_cont.classList.add("fp_visible");
  melody_inputs_cont.classList.remove("animate__fadeOut");
  melody_inputs_cont.classList.add("animate__fadeIn");
  setCurrentActiveState(melody_inputs_cont);
}

function setCurrentActiveState(element) {
  currentActiveElement = element;
}

function removeActiveState(element) {
  element.classList.add("fp_inVisible");
  element.classList.remove("fp_visible");
  element.classList.add("animate__fadeOut");
  element.classList.remove("animate__fadeIn");
}

document.getElementById('shimmer_bass').addEventListener("input", function(event) {
  shimmer_bass.volume.value = event.target.value;
});

document.getElementById('beginning_bass').addEventListener("input", function(event) {
  beginning_bass.volume.value = event.target.value;
});

document.getElementById('dawn_bass').addEventListener("input", function(event) {
  dawn_bass.volume.value = event.target.value;
});

document.getElementById('shimmer_melody').addEventListener("input", function(event) {
  shimmer_arp.volume.value = event.target.value;
});

document.getElementById('beginning_melody').addEventListener("input", function(event) {
  beginning_arp.volume.value = event.target.value;
});

document.getElementById('dawn_melody').addEventListener("input", function(event) {
  dawn_arp.volume.value = event.target.value;
});

document.getElementById('shimmer_piano').addEventListener("input", function(event) {
  shimmer_piano.volume.value = event.target.value;
});

document.getElementById('beginning_piano').addEventListener("input", function(event) {
  beginning_piano.volume.value = event.target.value;
});

document.getElementById('dawn_piano').addEventListener("input", function(event) {
  dawn_piano.volume.value = event.target.value;
});

document.getElementById('shimmer_synth').addEventListener("input", function(event) {
  shimmer_synth.volume.value = event.target.value;
});

document.getElementById('beginning_synth').addEventListener("input", function(event) {
  beginning_synth.volume.value = event.target.value;
});

document.getElementById('dawn_synth').addEventListener("input", function(event) {
  dawn_synth.volume.value = event.target.value;
});

document.getElementById('shimmer_drums').addEventListener("input", function(event) {
  shimmer_drums.volume.value = event.target.value;
});

document.getElementById('beginning_drums').addEventListener("input", function(event) {
  beginning_drums.volume.value = event.target.value;
});

document.getElementById('dawn_drums').addEventListener("input", function(event) {
  dawn_drums.volume.value = event.target.value;
});

document.getElementById('shimmer_vocals').addEventListener("input", function(event) {
  shimmer_vocals.volume.value = event.target.value;
});

document.getElementById('beginning_vocals').addEventListener("input", function(event) {
  beginning_vocals.volume.value = event.target.value;
});

document.getElementById('dawn_vocals').addEventListener("input", function(event) {
  dawn_vocals.volume.value = event.target.value;
});
