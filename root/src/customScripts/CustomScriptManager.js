export default class CustomScriptManager {
  constructor({ registry = {}, screenElement, iconContainer }) {
    this.registry = registry;
    this.screenElement = screenElement;
    this.iconContainer = iconContainer;
    this.activeScripts = [];
  }

  clearActiveScripts() {
    this.activeScripts.forEach((script) => {
      if (typeof script.destroy === 'function') {
        script.destroy();
      }
    });
    this.activeScripts = [];
    if (this.iconContainer) {
      this.iconContainer.innerHTML = '';
    }
  }

  applyScreenScripts(screen, context = {}) {
    this.clearActiveScripts();
    if (!screen) {
      return;
    }
    const scripts = screen.getCustomScripts();
    if (!Array.isArray(scripts) || scripts.length === 0) {
      return;
    }
    scripts.forEach((definition) => {
      const scriptId = typeof definition === 'string' ? definition : definition?.id;
      if (!scriptId) {
        return;
      }
      const ScriptClass = this.registry[scriptId];
      if (!ScriptClass) {
        // eslint-disable-next-line no-console
        console.warn(`Custom script with id "${scriptId}" is not registered.`);
        return;
      }
      const options =
        definition && typeof definition === 'object' && !Array.isArray(definition)
          ? definition.options || {}
          : {};
      const instance = new ScriptClass({
        screen,
        game: context.game,
        screenElement: this.screenElement,
        iconContainer: this.iconContainer,
        options,
      });
      if (typeof instance.init === 'function') {
        instance.init();
      }
      this.activeScripts.push(instance);
    });
  }
}
