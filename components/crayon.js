AFRAME.registerComponent('crayon', {
  init: function () {
    this.hit = null;
    this.points = document.getElementById('points');
    this.el.addEventListener('raycaster-intersection', (e, f) => {
      this.hit = e.detail.els[0];
    });
    const child = document.createElement('a-cylinder');
    child.setAttribute('radius', '0.003');
    child.setAttribute('height', '0.09');
    child.setAttribute('color', 'red');
    const r = document.createElement('a-entity');
    this.el.setAttribute('raycaster', 'objects: .drawable; showLine: true; far: 0.13; direction: 0 -1 0');
    this.el.appendChild(child);
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