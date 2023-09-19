using System.Net;
using Microsoft.AspNetCore.Http;
using OdataPlayground.Configs;
using OdataPlayground.Models;

namespace OdataPlayground.Middlewares;

public class DevRedirectMiddleware
{
    private readonly RequestDelegate _next;
    private readonly OdataPlaygroundConfigurationOptionsDev _options;
    private readonly Client _httpClient;
    
    public DevRedirectMiddleware(Client httpClient, RequestDelegate next, OdataPlaygroundConfigurationOptionsDev options)
    {
        _httpClient = httpClient;
        _next = next;
        _options = options;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        string requestPath = context.Request.Path;
        var queryParams = context.Request.Query["odataPath"].ToString();

        if (requestPath == _options.UiPath)
        {
            
            if (queryParams == "" && _options.OdataEndpointPath != "")
            {
                context.Response.Redirect($"{_options.UiPath}?odataPath={_options.RedirectUrl}{_options.OdataEndpointPath}");
                return;
            }

            try
            {
                var response = await _httpClient.GetAsync(_options.RedirectUrl);
                await context.Response.WriteAsync(response);
                return;
            }
            catch (HttpRequestException _)
            {
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                await context.Response.WriteAsync($"Frontend Server on '{_options.RedirectUrl}' isn't active! Please check");
                return;
            }
            
        }

        if (requestPath.StartsWith(_options.UiPath))
        {
            var response = await _httpClient.GetAsync($"{_options.RedirectUrl}{requestPath}");
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            var mimeType = MimeTypes.GetMimeType(requestPath);
            context.Response.ContentType = mimeType;
            await context.Response.WriteAsync(response);
            return;
        }

        await _next.Invoke(context);

    }
}