AFRAME.registerComponent('paint', {
  init: function () {
    this.isDrawing = false;
    this.points = [];
    this.line = null;

    // raycaster only works on drawing plane
    this.el.setAttribute('raycaster', {
      objects: '#drawingPlane'
    });

    // trigger events for controller
    this.el.addEventListener('triggerdown', this.startDrawing.bind(this));
    this.el.addEventListener('triggerup', this.stopDrawing.bind(this));
  },

  startDrawing: function () {
    this.isDrawing = true;
    this.points = [];

    // create new three line
    const material = new THREE.LineBasicMaterial({ color: '#000' });
    // z-index offset
    material.polygonOffset = true;
    material.polygonOffsetFactor = 1;
    material.polygonOffsetUnits = 1;

    const geometry = new THREE.BufferGeometry();
    this.line = new THREE.Line(geometry, material);
    this.line.name = 'painting-line';

    // add line to scene
    this.el.sceneEl.object3D.add(this.line);
  },

  stopDrawing: function () {
    this.isDrawing = false;
  },

  tick: function () {
    if (!this.isDrawing) { return; }

    const raycasterComp = this.el.components.raycaster;
    if (!raycasterComp) { return; }

    const intersections = raycasterComp.intersections;
    if (intersections.length > 0) {
      const intersect = intersections[0];
      const point = intersect.point;

      // create line from points
      // add point if the distance to the last one is big enough
      if (this.points.length === 0 || point.distanceTo(this.points[this.points.length - 1]) > 0.01) {
        // add offset
        const offset = new THREE.Vector3(0, 0.001, 0);
        this.points.push(point.clone().add(offset));
        
        // set position of the points
        const positions = new Float32Array(this.points.length * 3);
        for (let i = 0; i < this.points.length; i++) {
          positions[i * 3]     = this.points[i].x;
          positions[i * 3 + 1] = this.points[i].y;
          positions[i * 3 + 2] = this.points[i].z;
        }
        
        // set attribute of line geometry
        this.line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.line.geometry.attributes.position.needsUpdate = true;
        this.line.geometry.setDrawRange(0, this.points.length);
      }
    }
  }
});