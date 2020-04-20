var abp = abp || {};
(() => {
  if (!FreezeUI || !UnFreezeUI) {
    return;
  }

  abp.ui.setBusy = (elm, text, delay) => {
    FreezeUI({
      element: elm,
      text: text ? text : " ",
      delay: delay,
    });
  };

  abp.ui.clearBusy = (elm, delay) => {
    UnFreezeUI({ element: elm, delay: delay });
  };
})();
