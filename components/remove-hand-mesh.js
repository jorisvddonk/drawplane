AFRAME.registerComponent('remove-hand-mesh', {
  init: function () { },
  tick: function (time) {
    var obj3d = this.el.getObject3D('mesh');
    if (obj3d) {
      this.el.removeObject3D('mesh');
      this.el.removeAttribute('remove-hand-mesh'); // once default hand model is removed; remove this component
    }
  }
});