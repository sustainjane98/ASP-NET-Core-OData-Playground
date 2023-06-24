namespace OdataPlayground.Models;

public class OdataScheme
{
    public string OdataContext { get; set; } = "";
    public OdataContextElement[] Value { get; set; } = Array.Empty<OdataContextElement>();

}