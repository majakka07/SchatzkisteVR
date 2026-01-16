AFRAME.registerComponent('start-link', {
  
  init: function () {
      // hovering button
      this.el.addEventListener('mouseenter', function (event) {
        event.target.setAttribute('color', '#8DAAA6')
      })
      this.el.addEventListener('mouseleave', function (event) {
        event.target.setAttribute('color', '#ffffff')
      })
      // link to start
      this.el.addEventListener('click', function () {
        window.location.href = "start.html";
      });
    }
  });