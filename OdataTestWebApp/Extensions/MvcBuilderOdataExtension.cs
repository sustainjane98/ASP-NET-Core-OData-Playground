using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using OdataTestWebApp.Models.Daos.Setting;
using OdataTestWebApp.Models.Dtos;

namespace OdataTestWebApp.Extensions;

public static class MvcBuilderOdataExtension
{
    private static IEdmModel GetOdataTestWebApplicationModel()
    {
        var modelBuilder = new ODataConventionModelBuilder();
        modelBuilder.Function("returnMostRecentCustomer").ReturnsFromEntitySet<Customer>("customer");
        modelBuilder.EntitySet<Customer>(nameof(Customer));
        modelBuilder.EntityType<Customer>().Function("mostRecent")
            .Returns<string>();
        modelBuilder.Singleton<Setting>(nameof(Setting));
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