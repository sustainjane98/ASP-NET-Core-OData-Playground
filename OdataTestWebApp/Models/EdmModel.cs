using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace OdataTestWebApp.Models;

public static class EdmModel
{
    public static IEdmModel GetModel()
    {
        var modelBuilder = new ODataConventionModelBuilder();
        modelBuilder.EntitySet<Customer>(nameof(Customer));
        return modelBuilder.GetEdmModel();
    }
}