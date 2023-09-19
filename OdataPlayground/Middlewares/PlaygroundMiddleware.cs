using Microsoft.AspNetCore.Http;
using OdataPlayground.Configs;
using OdataPlayground.Extensions;
using OdataPlayground.Models;

namespace OdataPlayground.Middlewares;

public class PlaygroundMiddleware
{
    private readonly OdataPlaygroundConfigurationOptions _options;
    private RequestDelegate Next { get; }

    public PlaygroundMiddleware(RequestDelegate next, OdataPlaygroundConfigurationOptions options)
    {
        _options = options;
        Next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        string requestPath = context.Request.Path;
        var queryParams = context.Request.Query["odataPath"].ToString();
        
        
        if (requestPath == _options.UiPath)
        {

            if (queryParams == "" && _options.OdataEndpointPath != "")
            {
                context.Response.Redirect($"{_options.UiPath}?odataPath={_options.OdataEndpointPath}");
            }
            else
            {
                await context.ProvideOdataPlayGround();
            }
            return;
        }
        
        if (requestPath.StartsWith(_options.UiPath))
        {
            await context.ProvideOdataStaticAssets(requestPath, _options.UiPath);
            return;
        }
        
        if (requestPath.StartsWith("/locales"))
        {
            await context.ProvideOdataStaticAssets(requestPath, "");
            return;
        }
        
        await Next.Invoke(context);
        
    }
}
