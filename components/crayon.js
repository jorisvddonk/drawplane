AFRAME.registerComponent('crayon', {
  schema: {
    color: {
      type: "string",
      default: 'white'
    }
  },
  init: function () {
    this.hit = null;
    this.points = document.getElementById('points');
    this.el.addEventListener('raycaster-intersection', (e, f) => {
      this.hit = e.detail.els[0];
    });
    this.el.addEventListener('raycaster-intersection-cleared', (e, f) => {
      this.finishLine();
    });
    const child = document.createElement('a-cylinder');
    child.setAttribute('radius', '0.003');
    child.setAttribute('height', '0.09');
    child.setAttribute('color', this.data.color);
    this.el.setAttribute('raycaster', 'objects: .drawable; showLine: false; far: 0.13; direction: 0 -1 0; origin: 0 0.05 0');
    this.el.appendChild(child);
  },
  createLine: function (point) {
    this.lastLine = document.createElement('a-entity');
    this.lastLine.setAttribute('meshline', `lineWidth: 20; path: ${point.x} ${point.y} ${point.z}; color: ${this.data.color}`);
    this.lastLine.setAttribute('linedrawer', "");
    this.points.appendChild(this.lastLine);
  },
  finishLine: function () {
    if (this.lastLine !== undefined) {
      this.lastLine.components.linedrawer.finish(this.data.color);
    }
    this.lastLine = undefined;
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
          this.finishLine();
        }
      }
    }
  }
});