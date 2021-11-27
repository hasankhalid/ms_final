let player1 = new Tone.Player('fractures.mp3').toDestination();
let player2 = new Tone.Player('shipwreck.mp3').toDestination();
let playing = false;

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
