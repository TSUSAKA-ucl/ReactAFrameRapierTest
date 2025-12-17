import AFRAME from 'aframe'

AFRAME.registerComponent('event-forwarder', {
  schema: {
    destination: {type: 'string' }, // イベントを転送する先のa-entityのID名文字列
    events: {type: 'array' }, // argに与えるObjectのkeyの一覧
    bubble: {type: 'boolean', default: false } // イベントをバブリングさせるかどうか
  },
  init: function() {
    // ReactによりDOMがロードされているか不明なため、sceneのloadedイベントを待って
    // そのlistenerの中で、querySelectorによるDOM取得とaddEventListenerの登録を行う
    this.el.sceneEl.addEventListener('loaded', () => {
      const destinationEl = document.querySelector(this.data.destination);
      if (!destinationEl) {
	console.warn('event-forwarder component requires a valid destination selector.');
	return;
      }
      this.data.events.forEach( (eventName) => {
	this.el.addEventListener(eventName, (event) => {
	  const newEventName = this.el.id + ':' + eventName;
	  destinationEl.emit(newEventName, event.detail, this.data.bubble);
	});
      });
    });
  }
});  
