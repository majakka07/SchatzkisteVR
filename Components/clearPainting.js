
AFRAME.registerComponent('clear-painting', {
    init: function () {
      // hover effect for button
      this.el.addEventListener('mouseenter', function (event) {
        event.target.setAttribute('color', '#8DAAA6');
      });
      this.el.addEventListener('mouseleave', function (event) {
        event.target.setAttribute('color', '#ffffff');
      });
      
      // clear painting on click
      this.el.addEventListener('click', function () {
        let sceneEl = document.querySelector('a-scene');
        let linesToRemove = [];
        
        // collecting all objects with the name painting line
        sceneEl.object3D.traverse(function (obj) {
          if (obj.type === "Line" && obj.name === "painting-line") {
            linesToRemove.push(obj);
          }
        });
        
        // delete all lines
        if (linesToRemove.length > 0) {
          linesToRemove.forEach(function (line) {
            sceneEl.object3D.remove(line);
            if (line.geometry) { line.geometry.dispose(); }
            if (line.material) { line.material.dispose(); }
          });
          console.log("Alle Linien wurden entfernt.");
        } else {
          console.log("Keine Linien gefunden.");
        }
      });
    }
  });
  