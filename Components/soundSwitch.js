AFRAME.registerComponent('sound-switch', {
  
    init: function () {
        // hovering button
        this.el.addEventListener('mouseenter', function (event) {
            event.target.setAttribute('color', '#8DAAA6')
          })
          this.el.addEventListener('mouseleave', function (event) {
            event.target.setAttribute('color', '#ffffff')
          })
        // sound switch
        let soundButton = this.el;
        let soundEntity = document.querySelector('#background-sound');
        let soundText = document.querySelector('#sound-text')

        soundButton.addEventListener('click', function () {
            // pause sound on click
            if(soundButton.getAttribute('class') === 'soundOn') {
                soundEntity.components.sound.pauseSound();
                soundButton.setAttribute('class', 'soundOff')
                soundText.setAttribute('text', 'value: Ton an')
            }
            // start sound on click
            else if(soundButton.getAttribute('class') === 'soundOff') {
                soundEntity.components.sound.playSound();
                soundButton.setAttribute('class', 'soundOn')
                soundText.setAttribute('text', 'value: Ton aus')
            }
        })
    }
});