AFRAME.registerGeometry('lines', {
  schema: {},
  init: function (data) {
    var positions = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)];
    var colors = [new THREE.Color(1, 1, 1)];

    var geometry = new THREE.LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);
    this.geometry = geometry;
  }
});