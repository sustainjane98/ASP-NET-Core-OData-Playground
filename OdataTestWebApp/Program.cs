using Microsoft.AspNetCore.OData;
using OdataPlayground.Handlers;
using OdataPlayground.Models;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Models;

var builder = WebApplication.CreateBuilder(args);

var config = new HostConfiguration(builder.Configuration);

builder.Services.AddControllers().AddOData(
    options => options.Select().Filter().EnableQueryFeatures().AddRouteComponents(
        "",
        EdmModel.GetModel()));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.MapControllers();

app.UseOdataPlaygroundUi(new OdataPlaygroundConfigurationOptions() {UiPath = "/odata", ServerBaseUrl = config.HttpUrl});

app.Run();