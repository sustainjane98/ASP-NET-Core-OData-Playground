using Microsoft.Extensions.Options;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Models.Settings;

namespace OdataTestWebApp.Extensions;

public static class WebApplicationBuilderExtension
{
    public static WebApplicationBuilder ConfigureCors(this WebApplicationBuilder webApplicationBuilder)
    {
        webApplicationBuilder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "http://localhost:5050").AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        return webApplicationBuilder;
    }

    private static void InjectDbContext(IServiceCollection serviceCollection)
    {
        serviceCollection.AddDbContext<AppDbContext>();
    }

    private static void InjectAppConfiguration(WebApplicationBuilder webApplicationBuilder)
    {
        webApplicationBuilder.Services.AddOptions<DatabaseSettings>().BindConfiguration("Database").ValidateDataAnnotations().ValidateOnStart();
        webApplicationBuilder.Services.AddSingleton(resolver => 
            resolver.GetRequiredService<IOptions<DatabaseSettings>>().Value);
    }

    public static WebApplicationBuilder InjectDependencies(this WebApplicationBuilder webApplicationBuilder)
    {
        InjectDbContext(webApplicationBuilder.Services);
        InjectAppConfiguration(webApplicationBuilder);
        return webApplicationBuilder;
    }
    
}