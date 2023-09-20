using System.Net;
using System.Text.RegularExpressions;
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
        try
        {

            string requestPath = context.Request.Path;
            var queryParams = context.Request.Query["odataPath"].ToString();

            if (requestPath == _options.UiPath)
            {

                if (queryParams == "" && _options.OdataEndpointPath != "")
                {
                    context.Response.Redirect(
                        $"{_options.UiPath}?odataPath={_options.RedirectUrl}{_options.OdataEndpointPath}");
                    return;
                }


                var response = await _httpClient.GetAsyncAsString(_options.RedirectUrl);
                await context.Response.WriteAsync(response);
                return;

            }

            if (Regex.IsMatch(requestPath, "(@(fs|vite|react-refresh)|\\.(tsx|ts|js|json|jsx|css|ico|jpg|png|svg))"))
            {
                var response = await _httpClient.GetAsyncAsString($"{_options.RedirectUrl}{requestPath}");
                context.Response.StatusCode = (int) HttpStatusCode.OK;

                var filename = Regex.Match(requestPath, "\\/[a-z]+.\\w+$").Value.Replace("/", "");

                if (!Regex.IsMatch(filename, "\\.w+$") || Regex.IsMatch(filename, "\\.(tsx|ts|jsx)$"))
                {
                    filename += ".js";
                }

                var mimeType = MimeTypes.GetMimeType(filename);
                context.Response.ContentType = mimeType;
                await context.Response.WriteAsync(response);
                return;
            }

        }
        catch (HttpRequestException)
        {
            context.Response.StatusCode = (int) HttpStatusCode.NotFound;
            WriteErrorMessage(context, "Resource not found",
                $"Frontend Server on '{_options.RedirectUrl}' isn't active! Please check");
        }
        catch (ArgumentNullException)
        {
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            WriteErrorMessage(context, "The request is null, please check");
        }
        catch (InvalidOperationException)
        {
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            WriteErrorMessage(context, "The request message was already sent, please check");
        }
        catch (TaskCanceledException)
        {
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            WriteErrorMessage(context, "Request got canceled, please check");
        }

        await _next.Invoke(context);
    }

    private void WriteErrorMessage(HttpContext context, string message, string? uiMessage = null)
    {

        if (context.Request.Path.Value == _options.UiPath)
        {
            context.Response.WriteAsync(uiMessage ?? message);
            return;
        }
        
        context.Response.WriteAsync(message);
        
    }
}