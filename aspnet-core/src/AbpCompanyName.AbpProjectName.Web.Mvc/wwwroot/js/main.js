(function ($) {
    //Notification handler
    abp.event.on('abp.notifications.received', function (userNotification) {
        abp.notifications.showUiNotifyForUserNotification(userNotification);

        //Desktop notification
        Push.create("AbpProjectName", {
            body: userNotification.notification.data.message,
            icon: abp.appPath + 'img/logo.png',
            timeout: 6000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    });

    //serializeFormToObject plugin for jQuery
    $.fn.serializeFormToObject = function (camelCased = false) {
        //serialize to array
        var data = $(this).serializeArray();

        //add also disabled items
        $(':disabled[name]', this).each(function () {
            data.push({name: this.name, value: $(this).val()});
        });

        //map to object
        var obj = {};
        data.map(function (x) {
            obj[x.name] = x.value;
        });

        if (camelCased && camelCased === true) {
            return convertToCamelCasedObject(obj);
        }

        return obj;
    };

    //Configure blockUI
    if ($.blockUI) {
        $.blockUI.defaults.baseZ = 2000;
    }

    //Configure validator
    $.validator.setDefaults({
        highlight: (el) => {
            $(el).addClass('is-invalid');
        },
        unhighlight: (el) => {
            $(el).removeClass('is-invalid');
        },
        errorElement: 'p',
        errorClass: 'text-danger',
        errorPlacement: (error, element) => {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    function convertToCamelCasedObject(obj) {
        var newObj, origKey, newKey, value;
        if (obj instanceof Array) {
            return obj.map(value => {
                if (typeof value === 'object') {
                    value = convertToCamelCasedObject(value);
                }
                return value;
            });
        } else {
            newObj = {};
            for (origKey in obj) {
                if (obj.hasOwnProperty(origKey)) {
                    newKey = (
                        origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
                    ).toString();
                    value = obj[origKey];
                    if (
                        value instanceof Array ||
                        (value !== null && value.constructor === Object)
                    ) {
                        value = convertToCamelCasedObject(value);
                    }
                    newObj[newKey] = value;
                }
            }
        }
        return newObj;
    }

    function setAdvSearchTogglerIcon($advSearchBody, $advSearchTogglerIcon) {
        if ($advSearchBody.length <= 0 || $advSearchTogglerIcon.length <= 0)
            return false;

        if ($($advSearchBody).is(":hidden")) {
            $advSearchTogglerIcon.addClass("fa-angle-down");
            $advSearchTogglerIcon.removeClass("fa-angle-up");
        } else {
            $advSearchTogglerIcon.addClass("fa-angle-up");
            $advSearchTogglerIcon.removeClass("fa-angle-down");
        }

        return true;
    }
    
    function initAdvSearch() {
        $('.abp-advanced-search').each((i, obj) => {
            const $advSearch = $(obj);

            const $advSearchBody = $advSearch.find('.abp-advanced-search-body');
            if ($advSearchBody.length <= 0)
                return false;

            $advSearchBody.hide();

            const $advSearchToggler = $advSearch.find('.abp-advanced-search-toggler');
            if ($advSearchToggler.length <= 0)
                return false;

            const $advSearchTogglerIcon = $advSearchToggler.find('i');
            setAdvSearchTogglerIcon($advSearchBody, $advSearchTogglerIcon);

            $advSearchToggler.on("click", () => {
                if ($($advSearchBody).is(":hidden")) {
                    $advSearchBody.show();
                    setAdvSearchTogglerIcon($advSearchBody, $advSearchTogglerIcon);
                } else {
                    $advSearchBody.hide();
                    setAdvSearchTogglerIcon($advSearchBody, $advSearchTogglerIcon);
                }
            })
        });
    }

    initAdvSearch();

    $.fn.clearForm = function () {
        var $this = $(this);
        $this.validate().resetForm();
        $('[name]', $this).each((i, obj) => {
            $(obj).removeClass('is-invalid');
        });
        $this[0].reset();
    };
})(jQuery);
