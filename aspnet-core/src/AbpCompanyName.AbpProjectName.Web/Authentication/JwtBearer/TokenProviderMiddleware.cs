using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Authorization.Users;
using Abp.Json;
using Abp.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Net.MimeTypes;
using AbpCompanyName.AbpProjectName.Users;

namespace AbpCompanyName.AbpProjectName.Web.Authentication.JwtBearer
{
    /* This middleware is based on this article: https://stormpath.com/blog/token-authentication-asp-net-core
     **/
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenProviderOptions _options;

        public TokenProviderMiddleware(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options)
        {
            _next = next;
            _options = options.Value;
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (!context.Request.Method.Equals("POST") || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return context.Response.WriteAsync("Request must be POST with Content-Type: application/x-www-form-urlencoded.");
            }

            return GenerateTokenAsync(context);
        }

        private async Task GenerateTokenAsync(HttpContext context)
        {
            var tenancyName = context.Request.Form["tenancyName"];
            var userNameOrEmailAddress = context.Request.Form["usernameOrEmailAddress"];
            var password = context.Request.Form["password"];

            var userManager = context.RequestServices.GetRequiredService<LogInManager>();
            var loginResult = await userManager.LoginAsync(userNameOrEmailAddress, password, tenancyName);

            if (loginResult.Result != AbpLoginResultType.Success)
            {
                var errorMessage = context
                        .RequestServices
                        .GetRequiredService<AbpLoginResultTypeHelper>()
                        .CreateLocalizedMessageForFailedLoginAttempt(loginResult.Result, userNameOrEmailAddress, tenancyName);

                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(errorMessage);
                return;
            }

            var claims = loginResult.Identity.Claims.ToList();
            var now = DateTime.UtcNow;
            var nameIdClaim = claims.First(c => c.Type == ClaimTypes.NameIdentifier);

            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            claims.AddRange(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, nameIdClaim.Value),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.Now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            });

            // Create the JWT and write it to a string
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(_options.Expiration),
                signingCredentials: _options.SigningCredentials);

            var response = new AjaxResponse(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                expireInSeconds = (int)_options.Expiration.TotalSeconds
            });

            // Serialize and return the response
            context.Response.ContentType = MimeTypeNames.ApplicationJson;
            await context.Response.WriteAsync(response.ToJsonString(true, true));
        }
    }
}
