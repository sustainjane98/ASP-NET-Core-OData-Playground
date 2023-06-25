namespace OdataPlayground.Models;

public record OdataPlaygroundConfigurationOptionsDev: OdataPlaygroundConfigurationOptions
{
    public string RedirectUrl { get; set; }
}