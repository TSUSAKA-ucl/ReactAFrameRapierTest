import AFRAME from 'aframe'

AFRAME.registerComponent('vertical-controls', {
  schema: {
    speed: {type: 'number', default: 0.05}
  },
  init: function () {
    this.speed = this.data.speed;
    this.keys = {};
    this._onKeydown = this._onKeydown.bind(this);
    this._onKeyup = this._onKeyup.bind(this);
    document.addEventListener('keydown', this._onKeydown);
    document.addEventListener('keyup', this._onKeyup);
  },
  _onKeydown: function (evt) {
    this.keys[evt.key] = true;
  },
  _onKeyup: function (evt) {
    this.keys[evt.key] = false;
  },
  tick: function () {
    const el = this.el;
    const position = el.getAttribute('position');
    // 'R' キーで上昇
    if (this.keys['r'] || this.keys['R']) {
      position.y += this.speed;
    }
    // 'F' キーで下降
    if (this.keys['f'] || this.keys['F']) {
      position.y -= this.speed;
    }
    el.setAttribute('position', position);
  },
  remove: function () {
    document.removeEventListener('keydown', this._onKeydown);
    document.removeEventListener('keyup', this._onKeyup);
  }
});
