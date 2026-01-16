AFRAME.registerComponent('sound-once', {
    init: function () {
      const el = this.el;
      const playSoundOnce = function () {
        // play sound
        if (el.components.sound) {
          el.components.sound.playSound();
        }
        // remove the event listener so that it only plays once
        el.removeEventListener('mouseenter', playSoundOnce);
      };
      el.addEventListener('mouseenter', playSoundOnce);
    }
  });