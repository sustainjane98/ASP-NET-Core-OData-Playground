namespace OdataTestWebApp.Configurations;

public class HostConfiguration
{
    private const string SectionName = "Kestrel.Endpoints";

    public HostConfiguration(IConfiguration config)
    {
        var baseSection = config.GetSection("Kestrel").GetSection("Endpoints");

        HttpUrl = baseSection.GetSection("http").GetSection("Url").Value;
        HttpsUrl = baseSection.GetSection("https").GetSection("Url").Value;

    }

    public string? HttpUrl { get; set; }
    public string? HttpsUrl { get; set; }
}