using System.Web;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;

namespace OdataPlayground.Middlewares;

public class OdataMetadataJSONMiddleware
{
    private RequestDelegate Next { get; }
    private readonly HttpClient _client = new HttpClient();

    public OdataMetadataJSONMiddleware(RequestDelegate next)
    {
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

                var response = await (await _client.GetAsync(url)).Content.ReadAsStringAsync();

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