using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using OdataTestWebApp.Models.Daos;
namespace OdataTestWebApp.Extensions;

public static class MvcBuilderOdataExtension
{
    private static IEdmModel GetOdataTestWebApplicationModel()
    {
        var modelBuilder = new ODataConventionModelBuilder();
        modelBuilder.EntitySet<CustomerDao>(nameof(CustomerDao));
        return modelBuilder.GetEdmModel();
    }

    public static void ConfigureOdata(this IMvcBuilder builder)
    {
        builder.AddOData(
            options => options.Select().Filter().EnableQueryFeatures().AddRouteComponents(
                "",
                GetOdataTestWebApplicationModel()));
    }
}