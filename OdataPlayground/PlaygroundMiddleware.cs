using System.Net;
using Microsoft.AspNetCore.Http;

namespace OdataPlayground;

public class PlaygroundMiddleware
{
    private RequestDelegate Next { get; }

    public PlaygroundMiddleware(RequestDelegate next)
    {
        Next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        string requestPath = context.Request.Path;
        
        if (requestPath == "/odata")
        {   
            context.ProvideOdataPlayGround();
            return;
        }
        if (requestPath.StartsWith("/odata"))
        {
            context.ProvideOdataStaticAssets(requestPath);
            return;
        }


        await Next.Invoke(context);
        
    }
}
