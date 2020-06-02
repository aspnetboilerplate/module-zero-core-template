// taken from https://raw.githubusercontent.com/alexradulescu/FreezeUI and modified
(() => {
  let freezeHtml = document.createElement("div");
  freezeHtml.classList.add("freeze-ui");

  let freezedItems = [];

  let getSelector = (selector) => (selector ? selector : "body");

  let normalizeFreezeDelay = (delay) => (delay ? delay : 250);

  let shouldFreezeItem = (selector) => {
    let itemSelector = getSelector(selector);
    return freezedItems.indexOf(itemSelector) >= 0;
  };

  let addFreezedItem = (selector) => {
    let itemSelector = getSelector(selector);
    freezedItems.push(itemSelector);
  };

  let removeFreezedItem = (selector) => {
    let itemSelector = getSelector(selector);
    for (let i = 0; i < freezedItems.length; i++) {
      if (freezedItems[i] === itemSelector) {
        freezedItems.splice(i, 1);
      }
    }
  };

  window.FreezeUI = (options = {}) => {
    addFreezedItem(options.selector);
    const delay = normalizeFreezeDelay(options.delay);

    setTimeout(() => {
      if (!shouldFreezeItem(options.selector)) {
        return;
      }

      let parent;
      if (options.element) {
        parent = options.element;
      } else {
        parent = document.querySelector(options.selector) || document.body;
      }

      freezeHtml.setAttribute("data-text", options.text || "Loading");

      if (document.querySelector(options.selector) || options.element) {
        freezeHtml.style.position = "absolute";
      }

      parent.appendChild(freezeHtml);
    }, delay);
  };

  window.UnFreezeUI = (options = {}) => {
    removeFreezedItem(options.selector);
    const delay = normalizeFreezeDelay(options.delay) + 250;

    setTimeout(() => {
      let freezeHtml;
      if (options.element) {
        freezeHtml = options.element.querySelector(".freeze-ui");
      } else {
        freezeHtml = document.querySelector(".freeze-ui");
      }

      if (freezeHtml) {
        freezeHtml.classList.remove("is-unfreezing");
        if (freezeHtml.parentElement) {
          freezeHtml.parentElement.removeChild(freezeHtml);
        }
      }
    }, delay);
  };
})();
