export default class TextPaginator {
  constructor() {
    this.pages = [];
    this.currentIndex = 0;
  }

  /**
   * Store precomputed pages and reset the navigation index.
   * @param {string[]} pages - Array of text pages.
   */
  setPages(pages) {
    this.pages = Array.isArray(pages) ? pages : [];
    this.currentIndex = 0;
  }

  next() {
    if (this.currentIndex < this.pages.length - 1) {
      this.currentIndex += 1;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  getPage() {
    return this.pages[this.currentIndex] || '';
  }

  hasNext() {
    return this.currentIndex < this.pages.length - 1;
  }

  hasPrev() {
    return this.currentIndex > 0;
  }

  isEmpty() {
    return this.pages.length === 0;
  }
}
