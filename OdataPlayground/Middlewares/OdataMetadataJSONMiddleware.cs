using System.Web;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;
using OdataPlayground.Configs;

namespace OdataPlayground.Middlewares;

public class OdataMetadataJsonMiddleware
{
    private RequestDelegate Next { get; }
    private readonly Client _client;

    public OdataMetadataJsonMiddleware(Client client, RequestDelegate next)
    {
        _client = client;
        Next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        try
        {

            var request = context.Request;


            var path = request.Path;
            var isJson = request.Headers["Accept"].Equals("application/json");

            if (path == "/$metadata" && isJson)
            {
                var url = context.Request.GetEncodedUrl();

                var response = (await _client.GetAsyncAsString(url));

                var xmlRoot = XDocument.Parse(response);

                var json = JsonConvert.SerializeXNode(xmlRoot, Formatting.Indented);

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsync(json);
            }
        }
        finally
        {
            if(!context.Response.HasStarted)
                await Next.Invoke(context);
        }
    }
}