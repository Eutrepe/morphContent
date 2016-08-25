import defaultOptions from './modules/options';

function setStyle (el, styles) {
  for(let prop in styles) {
    el.style[prop] = styles[prop];
  }
}

const map = new WeakMap();

class MorphContent {
  constructor(element, settings) {
    map.set(this, {
      element,
      settings,
      calculations: {
        elementWidth: 0,
        elementHeight: 0,
        startLeft: 0,
        startTop: 0,
        screenWidth: 0,
        screenHeight: 0,
        screenWidthCenter: 0,
        screenHeightCenter: 0,
      },
    });
  }

  mergeSettings() {
    if ((typeof map.get(this).settings).toLowerCase() !== 'object') {
      map.get(this).settings = {};
    }

    map.get(this).settings = Object.assign(defaultOptions, map.get(this).settings);
  }

  init() {

    const element = map.get(this).element;


    element.addEventListener("click", (event) => {

      event.preventDefault();

      this.recalculate();

      const calculations = map.get(this).calculations;

      console.log(calculations)

      setStyle(element, {
        "position": "absolute",
        "top": calculations.screenHeightCenter - calculations.startTop + "px",
        "left": calculations.screenWidthCenter - calculations.startLeft + "px",
        "transform": "translate3d(-50%, -50%, 0)"
      });


    }, true);
  }

  recalculate () {
    const element = map.get(this).element;
    const rect = element.getBoundingClientRect();
    const screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    const screenHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;

    const calculations = {
       elWidth:  element.offsetWidth,
       elHeight: element.offsetHeight,
       startLeft: rect.left + document.body.scrollLeft,
       startTop: rect.top + document.body.scrollTop,
       screenWidth: screenWidth,
       screenHeight: screenHeight,
       screenWidthCenter: (screenWidth + document.body.scrollLeft ) / 2,
       screenHeightCenter: (screenHeight + document.body.scrollTop ) / 2,

    }

    map.get(this).calculations = calculations;

  }

  initClick(event) {

  //

  if(this === event.target) {
      console.log("Yupi");
    }
  }

}

export default MorphContent;

