using Microsoft.AspNetCore.OData;
using OdataPlayground.Handlers;
using OdataPlayground.Models;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Extensions;

var builder = WebApplication.CreateBuilder(args);

var config = new HostConfiguration(builder.Configuration);

builder.ConfigureCors();

builder.InjectDependencies();

builder.Services.AddControllers().ConfigureOdata();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.MapControllers();

if (builder.Environment.IsDevelopment())
{
    
    app.UseODataRouteDebug();
    
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