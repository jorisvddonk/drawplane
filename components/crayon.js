AFRAME.registerComponent('crayon', {
  init: function () {
    this.hit = null;
    this.points = document.getElementById('points');
    this.el.addEventListener('raycaster-intersection', (e, f) => {
      this.hit = e.detail.els[0];
    });
  },
  createLine: function (point) {
    this.lastLine = document.createElement('a-entity');
    this.lastLine.setAttribute('meshline', `lineWidth: 20; path: ${point.x} ${point.y} ${point.z}; color: #000000`);
    this.lastLine.setAttribute('linedrawer', "");
    this.points.appendChild(this.lastLine);
  },
  tick: function (time) {
    if (this.el && this.el.components && this.el.components.raycaster) {
      if (this.hit !== null) {
        const h = this.el.components.raycaster.getIntersection(this.hit);
        if (h !== null && h.distance < 0.1) {
          if (this.lastLine === undefined) {
            this.createLine(h.point);
          }
          this.lastLine.components.linedrawer.addPoint(h.point)
        } else {
          this.lastLine = undefined;
        }
      }
    }
  }
});