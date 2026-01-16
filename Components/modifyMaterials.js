AFRAME.registerComponent('modify-materials', {
    init: function () {
      this.el.addEventListener('model-loaded', () => {
        const obj = this.el.getObject3D('mesh');
        obj.traverse(node => {
          if (node.name.indexOf('ship') !== -1) {
            node.material.color.set('red');
          }
        });
      });
    }
});