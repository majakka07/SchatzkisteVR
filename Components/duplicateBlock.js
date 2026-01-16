AFRAME.registerComponent('duplicate-block', {
    init: function () {
        const sceneEl = document.querySelector('#workshop-scene');
        let lastHoveredObject = null;
        let grabbedObject = null;

        // raycaster only works on original blocks
        this.el.setAttribute('raycaster', {
            objects: '#original-blocks'
        });

        // scale hover effect for raycaster objects
        this.el.addEventListener('raycaster-intersection', function (event) {
            let intersectedObject = event.detail.intersections[0].object.el;

            if (intersectedObject) {
                intersectedObject.setAttribute('scale', '1.1 1.1 1.1');
                lastHoveredObject = intersectedObject;
            }
        });

        // stop hovering
        this.el.addEventListener('raycaster-intersection-cleared', function () {
            if (lastHoveredObject) {
                lastHoveredObject.setAttribute('scale', '1 1 1');
                lastHoveredObject = null;
            }
        });

        // on triggerdown duplicate block and attach to controller
        this.el.addEventListener('triggerdown', function () {
            if (lastHoveredObject) {
                let newObject = document.createElement(lastHoveredObject.tagName);

                // if object is cylinder change attributes
                if (lastHoveredObject.tagName === 'A-CYLINDER') {
                    newObject.setAttribute('height', lastHoveredObject.getAttribute('height'));
                    newObject.setAttribute('radius', lastHoveredObject.getAttribute('radius'));
                    newObject.setAttribute('src', lastHoveredObject.getAttribute('src'));
                // if object is box change attributes
                } else {
                    newObject.setAttribute('height', lastHoveredObject.getAttribute('height'));
                    newObject.setAttribute('width', lastHoveredObject.getAttribute('width'));
                    newObject.setAttribute('depth', lastHoveredObject.getAttribute('depth'));
                    newObject.setAttribute('src', lastHoveredObject.getAttribute('src'));
                }

                // add attributes to the cloned object
                newObject.setAttribute('scale', '1 1 1');
                newObject.setAttribute('id', 'dragging');
                newObject.setAttribute('grabbable','')

                // attach the cloned object to the controller
                this.appendChild(newObject);
                newObject.setAttribute('position', '0 0 -0.1');
                grabbedObject = newObject;
            }
        });

        // on triggerup detach from controller and attach to scene
        this.el.addEventListener('triggerup', function () {
            if (grabbedObject) {
                sceneEl.object3D.attach(grabbedObject.object3D);

                grabbedObject = null;
                console.log(document.querySelector('#cloned-object'))
            }
        });
    }
});
