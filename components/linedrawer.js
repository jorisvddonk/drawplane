AFRAME.registerComponent('linedrawer', {
  init: function () {
    this.rtcDrawing = this.el.sceneEl.systems["rtcDrawing"];
    this.lineData = [];
  },
  addPoint: function (point) {
    if (this.el && this.lineData) {
      this.lineData.push(point.toArray());
      this.el.setAttribute('meshline', 'path', this.lineData.map(x => `${x[0]} ${x[1]} ${x[2]}}`).join(', '))
    }
  },
  finish: function (color) {
    this.rtcDrawing.emit(this.lineData, color);
  }
});