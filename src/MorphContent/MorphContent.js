import defaultOptions from './modules/options';

const map = new WeakMap();

class MorphContent {
  constructor(element, settings) {
    map.set(this, {
      element,
      settings,
      calculations: {},
    });
  }

  margeSettings() {
    if ((typeof map.get(this).settings).toLowerCase() !== 'object') {
      map.get(this).settings = {};
    }

    map.get(this).settings = Object.assign(defaultOptions, map.get(this).settings);
  }

  fun() {
    this.margeSettings();
    console.log(map.get(this).settings);
  }
}

export default MorphContent;

