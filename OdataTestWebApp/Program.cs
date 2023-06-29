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

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.MapControllers();

if (builder.Environment.IsDevelopment())
{
    app.UseOdataPlaygroundUiDev(new OdataPlaygroundConfigurationOptionsDev()
    {
        UiPath = "/odata",
        ServerBaseUrl = config.HttpUrl,
        RedirectUrl = "http://localhost:3000"
    });
}
else
{
    app.UseOdataPlaygroundUi(new OdataPlaygroundConfigurationOptions() {UiPath = "/odata", ServerBaseUrl = config.HttpUrl});
}


app.Run();