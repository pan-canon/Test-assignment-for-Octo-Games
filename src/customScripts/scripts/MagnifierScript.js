import BaseCustomScript from '../BaseCustomScript.js';

export default class MagnifierScript extends BaseCustomScript {
  constructor(config) {
    super(config);
    this.handleOpen = this.openOverlay.bind(this);
    this.handleClose = this.closeOverlay.bind(this);
    this.handleOverlayClick = this.onOverlayClick.bind(this);
  }

  init() {
    if (!this.iconContainer || !this.screenElement) {
      return;
    }
    this.createIcon();
    this.createOverlay();
  }

  createIcon() {
    const button = this.registerElement(document.createElement('button'));
    button.type = 'button';
    button.className = 'screen__action-button screen__action-button--magnifier';
    button.innerHTML = this.options.icon || '&#128301;';
    button.setAttribute('aria-label', this.options.label || 'Open magnified view');
    this.registerEvent(button, 'click', this.handleOpen);
    this.iconContainer.appendChild(button);
    this.iconButton = button;
  }

  createOverlay() {
    const overlay = this.registerElement(document.createElement('div'));
    overlay.className = 'screen__custom-overlay screen__custom-overlay--hidden';

    const content = document.createElement('div');
    content.className = 'screen__custom-overlay-content';

    const viewport = document.createElement('div');
    viewport.className = 'screen__custom-overlay-viewport';

    const image = document.createElement('img');
    image.className = 'screen__custom-overlay-image';
    image.alt = this.options.alt || 'Magnified scene';
    viewport.appendChild(image);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'screen__custom-overlay-close';
    closeButton.setAttribute('aria-label', this.options.closeLabel || 'Close magnified view');
    closeButton.innerHTML = '&times;';

    this.registerEvent(closeButton, 'click', this.handleClose);
    this.registerEvent(overlay, 'click', this.handleOverlayClick);

    content.appendChild(closeButton);
    content.appendChild(viewport);
    overlay.appendChild(content);
    this.screenElement.appendChild(overlay);

    this.overlay = overlay;
    this.overlayImage = image;
  }

  openOverlay() {
    if (!this.overlay || !this.overlayImage) {
      return;
    }
    this.overlayImage.src = this.resolveImageSource();
    this.overlay.classList.remove('screen__custom-overlay--hidden');
  }

  closeOverlay() {
    if (!this.overlay) {
      return;
    }
    this.overlay.classList.add('screen__custom-overlay--hidden');
  }

  onOverlayClick(event) {
    if (event.target === this.overlay) {
      this.closeOverlay();
    }
  }

  resolveImageSource() {
    const character = this.game?.currentCharacter;
    if (character && this.options.images && this.options.images[character]) {
      return this.options.images[character];
    }
    if (this.options.image) {
      return this.options.image;
    }
    if (this.screen && character) {
      return this.screen.getImage(character);
    }
    return '';
  }

  destroy() {
    this.iconButton = null;
    this.overlay = null;
    this.overlayImage = null;
    super.destroy();
  }
}
