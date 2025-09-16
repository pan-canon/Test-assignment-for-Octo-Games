export default class Screen {
  constructor({
    id,
    title = '',
    images,
    texts,
    actions = {},
    info = '',
    relationshipThreshold = null,
    disableGenderSelection = false,
    customScripts = [],
  }) {
    this.id = id;
    this.title = title;
    this.images = images;
    this.texts = texts;
    this.actions = actions;
    this.info = info;
    this.relationshipThreshold = relationshipThreshold;
    this.disableGenderSelection = disableGenderSelection;
    this.customScripts = Array.isArray(customScripts) ? customScripts : [];
  }

  /**
   * Determine if the screen should be shown for the given relationship level.
   * @param {number} relationship - Current relationship value.
   * @returns {boolean} True when the relationship meets the threshold.
   */
  isAvailable(relationship) {
    if (this.relationshipThreshold === null || this.relationshipThreshold === undefined) {
      return true;
    }
    return relationship >= this.relationshipThreshold;
  }

  getImage(character) {
    return this.images[character];
  }

  getText(character) {
    return this.texts[character];
  }

  getInfo() {
    return this.info;
  }

  getTitle() {
    return this.title;
  }

  getActions(character) {
    return this.actions[character] || [];
  }

  /**
   * Check if the screen defines at least one selectable action.
   * @returns {boolean} True when any action list contains options.
   */
  hasActions() {
    return Object.values(this.actions).some(
      (actionList) => Array.isArray(actionList) && actionList.length > 0,
    );
  }

  /**
   * Determine whether progressing from the screen requires choosing an action.
   * @returns {boolean} True when an action must be selected to continue.
   */
  requiresActionSelection() {
    return this.hasActions();
  }

  isGenderSelectionDisabled() {
    return Boolean(this.disableGenderSelection);
  }

  getCustomScripts() {
    return this.customScripts;
  }
}
