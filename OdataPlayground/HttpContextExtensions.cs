using System.Net;
using Microsoft.AspNetCore.Http;

namespace OdataPlayground;

public static class HttpContextExtensions
{
    internal static async void ProvideOdataPlayGround(this HttpContext context)
    {
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

    internal static async void ProvideOdataStaticAssets(this HttpContext context, string path)
    {
        string result;

        string subPath = path.Replace("/odata", "");

        await using (FileStream fs = new FileStream($"../OdataPlayground/OdataPlaygroundApplication/build/{subPath}", FileMode.Open,
                         FileAccess.Read))
        {
            using (StreamReader mStreamWriter = new StreamReader(fs))
            {
                result = await mStreamWriter.ReadToEndAsync();
            }
        }
        
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        await context.Response.WriteAsync(result);
    }
}