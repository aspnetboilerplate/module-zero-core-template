var abp = abp || {};
(function () {

    /* Swagger */

    abp.swagger = abp.swagger || {};

    abp.swagger.addAuthToken = function () {
        var authToken = abp.auth.getToken();
        if (!authToken) {
            return false;
        }
        var cookieAuth = new SwaggerClient.ApiKeyAuthorization(abp.auth.tokenHeaderName, 'Bearer ' + authToken, 'header');
        swaggerUi.api.clientAuthorizations.add(abp.auth.tokenHeaderName, cookieAuth);
        return true;
    }

    abp.swagger.addCsrfToken = function () {
        var csrfToken = abp.security.antiForgery.getToken();
        if (!csrfToken) {
            return false;
        }
        var csrfCookieAuth = new SwaggerClient.ApiKeyAuthorization(abp.security.antiForgery.tokenHeaderName, csrfToken, 'header');
        swaggerUi.api.clientAuthorizations.add(abp.security.antiForgery.tokenHeaderName, csrfCookieAuth);
        return true;
    }

    abp.swagger.login = function () {
        var tenantId = window.prompt('tenantId');
        var usernameOrEmailAddress = window.prompt('usernameOrEmailAddress');
        if (!usernameOrEmailAddress) {
            return false;
        }
        var password = window.prompt('password');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var responseJSON = JSON.parse(xhr.responseText);
                var result = responseJSON.result;
                var expireDate = new Date(Date.now() + (result.expireInSeconds * 1000));
                abp.auth.setToken(result.accessToken, expireDate);
                abp.swagger.addAuthToken();
                console.log(true);
            }
        };
        xhr.open('POST', '/api/TokenAuth/Authenticate', true);
        xhr.setRequestHeader('Abp.TenantId', tenantId);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send("{" +
            "usernameOrEmailAddress:'" + usernameOrEmailAddress + "'," +
            "password:'" + password + "'}"
        );
    }

})();
