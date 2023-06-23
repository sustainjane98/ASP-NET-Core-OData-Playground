using OdataPlayground.Handlers;
using OdataPlayground.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOdataPlaygroundUi(new PlaygroundConfigurationOptions
    {
        UiPath = "/odata"
    });
}

app.MapControllers();

app.Run();