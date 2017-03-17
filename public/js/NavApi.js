'use strict'

class NavApi {

  /**
   * Adds the given callbacks to an array of link objects
   * @param {Object[]} links An array of link objects (containing text, url, and callbacks properties)
   * @param {function|function[]} callbacks A callback function or an array of callback functions
   * @returns {Object[]} returns new links with array given callbacks as callbacks property
   */
  addCallbacksToLinksArray(links, callbacks) {
    
    if(!Array.isArray(links)) {
      throw new Error('addCallbacksToLinksArray requires links parameter to be an array. Try addCallbacksToLink for single link');
    }

    let linksWithCallbacks = links.map(link => {
      let linkWithCallbacks = Object.assign({}, link);

      if(typeof(callbacks) === 'function') {
        linkWithCallbacks.callbacks = [...link.callbacks, callbacks];
      } else if(Array.isArray(callbacks)) {
        linkWithCallbacks.callbacks = [...link.callbacks, ...callbacks];
      } else {
        throw new Error('addCallbacksToLinksArray callbacks paramater must be function or array of functions');
      }

      return linkWithCallbacks;
    });

    return linksWithCallbacks;
  }

  addCallbacksToLink(link, callbacks) {
    
    let linkWithCallbacks = Object.assign({}, link);

    if(typeof(callbacks) === 'function') {
      linkWithCallbacks.callbacks = [...link.callbacks, callbacks];
    } else if(Array.isArray(callbacks)) {
      linkWithCallbacks.callbacks = [...link.callbacks, ...callbacks];
    } else {
      throw new Error('addCallbacksToLink callbacks paramater must be function or array of functions');
    }
    return linkWithCallbacks;
  }
}

export default new NavApi();