using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using OdataPlayground.Configs;

namespace OdataPlayground.Extensions;

public static class ServiceCollectionExtensions
{
    public static IHttpClientBuilder ConfigurePlaygroundHttpClient(this IServiceCollection services)
    {
        return services.AddHttpClient<Client>(httpClient =>
        {
            httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "*/*");
            httpClient.Timeout = TimeSpan.FromMinutes(1);
        });
    }
}