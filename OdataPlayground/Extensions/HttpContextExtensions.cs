using System.Net;
using Microsoft.AspNetCore.Http;

namespace OdataPlayground.Extensions;

public static class HttpContextExtensions
{
    internal static async Task ProvideOdataPlayGround(this HttpContext context)
    {
        
        if (context.Response.HasStarted)
        {
            return;
        }
        
        string resultHtml;

        await using (FileStream fs = new FileStream("../OdataPlayground/OdataPlaygroundApplication/build/index.html", FileMode.OpenOrCreate,
                         FileAccess.Read))
        {
            using (StreamReader mStreamWriter = new StreamReader(fs))
            {
                resultHtml = await mStreamWriter.ReadToEndAsync();
            }
        }
        
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        context.Response.ContentType = "text/html";
        await context.Response.WriteAsync(resultHtml);
        
    }

    internal static async Task ProvideOdataStaticAssets(this HttpContext context, string path, string configPath)
    {

        if (context.Response.HasStarted)
        {
            return;
        }
        
        string result;

        string subPath = path.Replace(configPath, "");

        await using (FileStream fs = new FileStream($"../OdataPlayground/OdataPlaygroundApplication/build/{subPath}", FileMode.Open,
                         FileAccess.Read))
        {
            using (StreamReader mStreamWriter = new StreamReader(fs))
            {
                result = await mStreamWriter.ReadToEndAsync();
            }
        }

        var mimeType = MimeTypes.GetMimeType(subPath);
        
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        context.Response.ContentType = mimeType;
        await context.Response.WriteAsync(result);
    }
}