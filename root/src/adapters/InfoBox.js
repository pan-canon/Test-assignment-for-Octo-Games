import TextPaginator from '../core/TextPaginator.js';

export default class InfoBox extends TextPaginator {
  constructor({ container, prevBtn, nextBtn, wrapper, toggleBtn, overlay }) {
    super();
    this.container = container;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.wrapper = wrapper;
    this.toggleBtn = toggleBtn;
    this.overlay = overlay;

    this.prevBtn.addEventListener('click', () => this.handlePrev());
    this.nextBtn.addEventListener('click', () => this.handleNext());
    this.toggleBtn.addEventListener('click', () => this.toggleCollapse());
    this.overlay.addEventListener('click', () => this.collapse());
  }

  /**
   * Navigate to the previous page and refresh the view.
   */
  handlePrev() {
    this.prev();
    this.update();
  }

  /**
   * Navigate to the next page and refresh the view.
   */
  handleNext() {
    this.next();
    this.update();
  }

  /**
   * Toggle visibility of the info box content.
   */
  toggleCollapse() {
    this.wrapper.classList.toggle('screen__info--collapsed');
    const collapsed = this.wrapper.classList.contains('screen__info--collapsed');
    this.toggleBtn.innerHTML = collapsed ? '&#9650;' : '&#9660;';
    this.overlay.style.display = collapsed ? 'none' : 'block';
  }

  /**
   * Collapse the info box if it is currently expanded.
   */
  collapse() {
    if (!this.wrapper.classList.contains('screen__info--collapsed')) {
      this.toggleCollapse();
    }
  }

  /**
   * Set text for the info box and prepare pagination.
   * @param {string} text - Full text to display.
   */
  setText(text) {
    if (!text) {
      this.wrapper.style.display = 'none';
      this.overlay.style.display = 'none';
      return;
    }
    this.wrapper.style.display = 'flex';
    this.wrapper.classList.remove('screen__info--collapsed');
    this.toggleBtn.innerHTML = '&#9660;';
    this.overlay.style.display = 'block';
    const pages = this.paginateText(text);
    this.setPages(pages);
    this.update();
  }

  paginateText(text) {
    const words = text.split(' ');
    const parent = this.container.parentNode;
    const temp = this.container.cloneNode();
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    temp.style.pointerEvents = 'none';
    temp.textContent = '';
    const heightRef = this.container.clientHeight || parent.clientHeight;
    const widthRef = this.container.clientWidth || parent.clientWidth;
    temp.style.width = `${widthRef}px`;
    parent.appendChild(temp);

    const pages = [];
    let page = '';
    words.forEach((word) => {
      const test = page ? `${page} ${word}` : word;
      temp.textContent = test;
      if (temp.scrollHeight > heightRef) {
        pages.push(page.trim());
        page = word;
        temp.textContent = page;
      } else {
        page = test;
      }
    });
    if (page) {
      pages.push(page.trim());
    }
    temp.parentNode.removeChild(temp);
    return pages;
  }

  update() {
    if (this.isEmpty()) {
      this.wrapper.style.display = 'none';
      this.overlay.style.display = 'none';
      return;
    }
    this.container.textContent = this.getPage();
    const showArrows = this.hasPrev() || this.hasNext();
    this.prevBtn.style.display = showArrows ? 'block' : 'none';
    this.nextBtn.style.display = showArrows ? 'block' : 'none';
    this.prevBtn.disabled = !this.hasPrev();
    this.nextBtn.disabled = !this.hasNext();
  }
}
