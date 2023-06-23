using Microsoft.AspNetCore.Builder;

namespace OdataPlayground;

public static class PlaygroundProvider  
{

    public static void AddOdataPlayground(this IApplicationBuilder wb)
    {
        wb.UseMiddleware<PlaygroundMiddleware>();
    }
    
}