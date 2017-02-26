'use strict'

class NavApi {

  /**
   * Adds the given callbacks to an array of link objects
   * @param {Object[]} links An array of link objects (containing text, url, and callbacks properties)
   * @param {function|function[]} callbacks A callback function or an array of callback functions
   * @returns {Object[]} returns new links with array given callbacks as callbacks property
   */
  addCallbacksToLinks(links, callbacks) {
    const linksWithCallbacks = links.map(link => {
      let linkWithCallbacks = Object.assign({}, link);

      if(typeof(callbacks) === 'function') {
        linkWithCallbacks.callbacks = [...link.callbacks, callbacks];
      } else if(Array.isArray(callbacks)) {
        linkWithCallbacks.callbacks = [...link.callbacks, ...callbacks];
      } else {
        throw new Error('addCallbacksToLinks second paramater must be function or array of functions');
      }

      return linkWithCallbacks;
    });

    return linksWithCallbacks;
  }
}

export default new NavApi();