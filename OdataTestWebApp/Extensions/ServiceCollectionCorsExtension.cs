using OdataTestWebApp.Configurations;

namespace OdataTestWebApp.Extensions;

public static class ServiceCollectionCorsExtension
{
    public static IServiceCollection ConfigureCors(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "http://localhost:5050").AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        return serviceCollection;
    }

    private static void InjectDbContext(IServiceCollection serviceCollection)
    {
        serviceCollection.AddDbContext<OdatatestWebAppDbContext>();
    }

    private static void InjectAppConfiguration(IServiceCollection serviceCollection)
    {
        
    }

    public static IServiceCollection InjectDependencies(this IServiceCollection serviceCollection)
    {
        InjectDbContext(serviceCollection);
        InjectDependencies(serviceCollection);
        return serviceCollection;
    }
    
}