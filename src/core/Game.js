import Screen from './Screen.js';
import { CHARACTERS } from './Character.js';

export default class Game {
  constructor({ screens }) {
    this.screens = screens.map((s) => new Screen(s));
    this.currentScreenIndex = 0;
    this.relationship = 0;
    this.currentCharacter = CHARACTERS.MALE;
    this.history = [];
    this.selectedAction = null;
  }

  get currentScreen() {
    return this.screens[this.currentScreenIndex];
  }

  /**
   * Check if there is a previous screen in history.
   * @returns {boolean} True when a previous screen exists.
   */
  hasPrevScreen() {
    return this.history.length > 0;
  }

  switchCharacter(character) {
    if (this.currentScreen.isGenderSelectionDisabled()) {
      return;
    }
    this.currentCharacter = character;
  }

  /**
   * Select an action and apply its relationship effect.
   * Allows re-selection by reverting the previous choice effect.
   * @param {Object} action - The chosen action configuration.
   */
  selectAction(action) {
    if (this.selectedAction) {
      this.relationship -= this.selectedAction.effect;
    }
    this.selectedAction = action;
    this.relationship += action.effect;
  }

  _findNextIndex() {
    const nextId = this.selectedAction?.next;
    let nextIndex;
    if (nextId) {
      nextIndex = this.screens.findIndex((s) => s.id === nextId);
    }
    if (nextIndex === undefined || nextIndex === -1) {
      nextIndex = this.currentScreenIndex + 1;
    }
    while (nextIndex < this.screens.length && !this.screens[nextIndex].isAvailable(this.relationship)) {
      nextIndex += 1;
    }
    return nextIndex;
  }

  hasNextScreen() {
    if (this.currentScreen.requiresActionSelection() && !this.selectedAction) {
      return false;
    }
    return this._findNextIndex() < this.screens.length;
  }

  nextScreen() {
    if (!this.hasNextScreen()) {
      return;
    }
    const nextIndex = this._findNextIndex();
    if (nextIndex < this.screens.length) {
      this.history.push({ index: this.currentScreenIndex, relationship: this.relationship });
      this.currentScreenIndex = nextIndex;
    }
    this.selectedAction = null;
  }

  prevScreen() {
    const lastState = this.history.pop();
    if (lastState) {
      this.currentScreenIndex = lastState.index;
      this.relationship = lastState.relationship;
    }
    this.selectedAction = null;
  }
}
