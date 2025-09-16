import InfoBox from './InfoBox.js';
import CustomScriptManager from '../customScripts/CustomScriptManager.js';
import { customScriptRegistry } from '../customScripts/registry.js';

export default class DomAdapter {
  constructor(game) {
    this.game = game;
    this.imageEl = document.querySelector('.screen__image');
    this.textEl = document.querySelector('.screen__text');
    this.choicesEl = document.querySelector('.screen__choices');
    this.relationshipEl = document.querySelector('.screen__relationship');
    this.titleEl = document.querySelector('.screen__title');
    this.screenEl = document.querySelector('.screen');
    this.nextBtn = document.querySelector('.screen__button--next');
    this.backBtn = document.querySelector('.screen__button--back');
    this.characterButtons = document.querySelectorAll('.screen__character');
    this.actionIconsContainer = document.querySelector('.screen__actions');
    this.infoWrapper = document.querySelector('.screen__info');
    this.infoText = document.querySelector('.screen__info-text');
    this.infoPrev = document.querySelector('.screen__info-arrow--prev');
    this.infoNext = document.querySelector('.screen__info-arrow--next');
    this.infoToggle = document.querySelector('.screen__info-toggle');
    this.overlay = document.querySelector('.screen__overlay');
    this.infoBox = new InfoBox({
      container: this.infoText,
      prevBtn: this.infoPrev,
      nextBtn: this.infoNext,
      wrapper: this.infoWrapper,
      toggleBtn: this.infoToggle,
      overlay: this.overlay,
    });

    this.customScriptManager = new CustomScriptManager({
      registry: customScriptRegistry,
      screenElement: this.screenEl,
      iconContainer: this.actionIconsContainer,
    });

    // Track screen changes to prevent unnecessary info box resets
    this.lastScreenId = null;

    this.nextBtn.addEventListener('click', () => this.handleNext());

    this.backBtn.addEventListener('click', () => this.handleBack());

    this.characterButtons.forEach((btn) => {
      btn.addEventListener('click', () => this.handleCharacterSwitch(btn.dataset.character));
    });

    this.render();
  }

  /**
   * Advance to the next screen and refresh the DOM.
   */
  handleNext() {
    this.game.nextScreen();
    this.render();
  }

  /**
   * Return to the previous screen when available and refresh the DOM.
   */
  handleBack() {
    if (this.game.hasPrevScreen()) {
      this.game.prevScreen();
      this.render();
    }
  }

  /**
   * Switch the active character and refresh the DOM.
   * @param {string} character - Selected character id.
   */
  handleCharacterSwitch(character) {
    if (this.game.currentScreen.isGenderSelectionDisabled()) {
      return;
    }
    this.game.switchCharacter(character);
    this.render();
  }

  render() {
    const screen = this.game.currentScreen;
    const character = this.game.currentCharacter;
    this.imageEl.src = screen.getImage(character);
    // Decorative image: prevent title duplication when image fails to load
    this.imageEl.alt = '';
    this.textEl.textContent = screen.getText(character);
    if (this.lastScreenId !== screen.id) {
      // Update info box only on screen change
      this.infoBox.setText(screen.getInfo());
      this.customScriptManager.applyScreenScripts(screen, { game: this.game });
      this.lastScreenId = screen.id;
    }
    this.relationshipEl.textContent = this.game.relationship;
    if (this.titleEl) {
      this.titleEl.textContent = screen.getTitle();
    }
    this.updateCharacterButtons(screen, character);
    const actions = screen.getActions(character);
    this.renderChoices(actions);
    const requiresSelection = screen.requiresActionSelection();
    this.nextBtn.disabled =
      (requiresSelection && !this.game.selectedAction) || !this.game.hasNextScreen();
    this.backBtn.disabled = !this.game.hasPrevScreen();
  }

  updateCharacterButtons(screen, activeCharacter) {
    const disabled = screen.isGenderSelectionDisabled();
    this.characterButtons.forEach((btn) => {
      const isActive = btn.dataset.character === activeCharacter;
      btn.disabled = disabled;
      btn.classList.toggle('screen__character--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  renderChoices(actions) {
    this.choicesEl.innerHTML = '';
    actions.forEach((action) => {
      const btn = document.createElement('button');
      btn.className = 'screen__choice';
      btn.textContent = action.text;
      if (this.game.selectedAction === action) {
        btn.classList.add('screen__choice--selected');
      }
      btn.addEventListener('click', () => {
        this.game.selectAction(action);
        this.render();
      });
      this.choicesEl.appendChild(btn);
    });
  }
}
