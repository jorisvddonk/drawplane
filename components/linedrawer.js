AFRAME.registerComponent('linedrawer', {
  addPoint: function (point) {
    if (this.el) {
      const meshline = this.el.getAttribute('meshline');
      if (meshline !== undefined) {
        const p = meshline.path;
        p.push(point);
        this.el.setAttribute('meshline', 'path', p.map(AFRAME.utils.coordinates.stringify).join(', '))
      }
    }
  }
});