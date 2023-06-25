using Microsoft.AspNetCore.Builder;
using OdataPlayground.Middlewares;
using OdataPlayground.Models;

namespace OdataPlayground.Handlers;

public static class PlaygroundProvider  
{

    public static void UseOdataPlaygroundUi(this IApplicationBuilder wb, OdataPlaygroundConfigurationOptions options)
    {
        wb.UseMiddleware<PlaygroundMiddleware>(options);
    }
    
    public static void UseOdataPlaygroundUiDev(this IApplicationBuilder wb, OdataPlaygroundConfigurationOptionsDev options)
    {
        wb.UseMiddleware<DevRedirectMiddleware>(options);
    }
    
}