'use strict'

/**
 * Helper class to manage layout properties of
 * HTML nodes when window resizes
 */
class LayoutUtility {

  constructor() {
    this.resizeFixedWrappers = this.resizeFixedWrappers.bind(this);
    this.addResizeFixedWrappersListener = this.addResizeFixedWrappersListener.bind(this);
    this.removeResizeFixedWrappersListener = this.removeResizeFixedWrappersListener.bind(this);

  }
  /**
   * Checks for any nodes that are wrapped around
   * elements with fixed position and resizes
   * to the fixed element's size and margins to
   * simulate the fixed element flowing in layout
   */
  resizeFixedWrappers() {
    const fixedWrappers = Array.from(document.getElementsByClassName('fixed-wrapper'));
    fixedWrappers.forEach((wrapper) => {
      wrapper.style.height = getComputedStyle(wrapper.firstChild).height.toString();
      wrapper.style.margin = getComputedStyle(wrapper.firstChild).margin.toString();
    });
  }

  /**
   * Continuously monitors window size
   * and resizes fixed wrappers
   */
  addResizeFixedWrappersListener() {
    window.addEventListener('resize', this.resizeFixedWrappers);
  }

  /**
   * Stops monitoring window size and
   * no longer resizes fixed wrappers
   */
  removeResizeFixedWrappersListener() {
    window.removeEventListener('resize', this.resizeFixedWrappers);
  }
}

export default new LayoutUtility();