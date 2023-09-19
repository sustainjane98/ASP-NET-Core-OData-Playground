using Microsoft.AspNetCore.OData;
using OdataPlayground.Extensions;
using OdataPlayground.Handlers;
using OdataPlayground.Models;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Extensions;

var builder = WebApplication.CreateBuilder(args);

var config = new HostConfiguration(builder.Configuration);

builder.ConfigureCors();

builder.Services.ConfigurePlaygroundHttpClient();

builder.InjectDependencies();

builder.Services.AddControllers().ConfigureOdata();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.MapControllers();

app.UseODataRouteDebug();

if (builder.Environment.IsDevelopment())
{
    app.UseOdataPlaygroundUiDev(new OdataPlaygroundConfigurationOptionsDev()
    {
        UiPath = "/odata",
        RedirectUrl = "http://localhost:3000"
    });
}
else
{
    app.UseOdataPlaygroundUi(new OdataPlaygroundConfigurationOptions() {UiPath = "/odata"});
}


app.Run();