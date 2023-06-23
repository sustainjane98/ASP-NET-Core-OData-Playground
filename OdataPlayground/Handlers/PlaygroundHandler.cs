using Microsoft.AspNetCore.Builder;
using OdataPlayground.Middlewares;
using OdataPlayground.Models;

namespace OdataPlayground.Handlers;

public static class PlaygroundProvider  
{

    public static void UseOdataPlaygroundUi(this IApplicationBuilder wb, PlaygroundConfigurationOptions options)
    {
        wb.UseMiddleware<PlaygroundMiddleware>(options);
    }
    
}