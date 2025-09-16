export default class BaseCustomScript {
  constructor({ screenElement, iconContainer, screen, game, options = {} }) {
    if (new.target === BaseCustomScript) {
      throw new Error('BaseCustomScript is abstract and cannot be instantiated directly.');
    }
    this.screenElement = screenElement;
    this.iconContainer = iconContainer;
    this.screen = screen;
    this.game = game;
    this.options = options;
    this.boundEvents = [];
    this.managedElements = [];
  }

  registerElement(element) {
    this.managedElements.push(element);
    return element;
  }

  registerEvent(target, type, handler) {
    target.addEventListener(type, handler);
    this.boundEvents.push({ target, type, handler });
  }

  destroy() {
    this.boundEvents.forEach(({ target, type, handler }) => {
      target.removeEventListener(type, handler);
    });
    this.boundEvents = [];
    this.managedElements.forEach((element) => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.managedElements = [];
  }
}
