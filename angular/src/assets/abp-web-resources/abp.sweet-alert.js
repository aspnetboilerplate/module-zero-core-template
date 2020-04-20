var abp = abp || {};
(() => {
  if (!Swal) {
    return;
  }

  /* MESSAGE **************************************************/

  let showMessage = (type, message, title, isHtml, options) => {
    if (!title) {
      title = message;
      message = undefined;
    }

    options = options || {};
    options.title = title;
    options.icon = type;
    options.confirmButtonText =
      options.confirmButtonText || abp.localization.abpWeb("Ok");

    if (isHtml) {
      options.html = message;
    } else {
      options.text = message;
    }

    return Swal.fire(options);
  };

  abp.message.info = (message, title, isHtml, options) => {
    return showMessage("info", message, title, isHtml, options);
  };

  abp.message.success = (message, title, isHtml, options) => {
    return showMessage("success", message, title, isHtml, options);
  };

  abp.message.warn = (message, title, isHtml, options) => {
    return showMessage("warning", message, title, isHtml, options);
  };

  abp.message.error = (message, title, isHtml, options) => {
    return showMessage("error", message, title, isHtml, options);
  };

  abp.message.confirm = (
    message,
    titleOrCallback,
    callback,
    isHtml,
    options
  ) => {
    let title = undefined;

    if (typeof titleOrCallback === "function") {
      callback = titleOrCallback;
    } else if (titleOrCallback) {
      title = titleOrCallback;
    }

    options = options || {};
    options.title = title ? title : abp.localization.abpWeb("AreYouSure");
    options.icon = "warning";

    options.confirmButtonText =
      options.confirmButtonText || abp.localization.abpWeb("Yes");
    options.cancelButtonText =
      options.cancelButtonText || abp.localization.abpWeb("Cancel");
    options.showCancelButton = true;

    if (isHtml) {
      options.html = message;
    } else {
      options.text = message;
    }

    return Swal.fire(options).then(function (result) {
      callback && callback(result.value);
    });
  };

  /* NOTIFICATION *********************************************/

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
  });

  let showNotification = (type, message, title, options) => {
    const icon = options.customClass.icon
      ? `<i class="mr-2 text-light ${options.customClass.icon}"></i>`
      : "";

    if (title) {
      options.title = `${icon}<span class="text-light">${title}</span>`;
    }

    options.html = `${title ? "" : icon}
    <span class="text-light">${message}</span>`;

    Toast.fire(options);
  };

  abp.notify.success = (message, title, options) => {
    showNotification(
      "success",
      message,
      title,
      Object.assign(
        {
          background: "#34bfa3",
          customClass: {
            icon: "fas fa-check-circle",
          },
        },
        options
      )
    );
  };

  abp.notify.info = (message, title, options) => {
    showNotification(
      "info",
      message,
      title,
      Object.assign(
        {
          background: "#36a3f7",
          customClass: {
            icon: "fas fa-info-circle",
          },
        },
        options
      )
    );
  };

  abp.notify.warn = (message, title, options) => {
    showNotification(
      "warning",
      message,
      title,
      Object.assign(
        {
          background: "#ffb822",
          customClass: {
            icon: "fas fa-exclamation-triangle",
          },
        },
        options
      )
    );
  };

  abp.notify.error = (message, title, options) => {
    showNotification(
      "error",
      message,
      title,
      Object.assign(
        {
          background: "#f4516c",
          customClass: {
            icon: "fas fa-exclamation-circle",
          },
        },
        options
      )
    );
  };
})();
