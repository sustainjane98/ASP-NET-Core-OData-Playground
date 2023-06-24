namespace OdataPlayground.Models;

public record OdataPlaygroundConfigurationOptions
{
    public string UiPath { get; set; } = "/odata";
    public string OdataEndpointPath { get; set; } = "";
    
    public string? ServerBaseUrl { get; set; } = "";
}