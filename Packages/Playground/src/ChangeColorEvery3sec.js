import AFRAME from 'aframe'

AFRAME.registerComponent('change-color-every-3sec', {
  schema: {
    colorList: {type: 'array', default: ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'original']},
    interval: {type: 'number', default: 3000},
  },
  init: function () {
    this.colors = this.data.colorList;
    this.currentIndex = 0;
    const changeColor = () => {
      this.el.removeAttribute('attach-color-recursively');
      this.el.setAttribute('attach-color-recursively',
			   `color: ${this.colors[this.currentIndex]}`);
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      setTimeout(changeColor, this.data.interval);
    }
    if (this.el.endLink) {
      changeColor();
    } else {
      this.el.addEventListener('robot-registered',changeColor);
    }
  }
});
