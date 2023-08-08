using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Models.Daos;

namespace OdataTestWebApp.Controllers;

public class SettingController: ODataController
{
    private readonly AppDbContext _context;

    public SettingController(AppDbContext context)
    {
        _context = context;
    }
    
    public ActionResult<IQueryable<SettingDao>> Get()
    {
        return Ok(_context.Settings.FirstOrDefault());
    }
    
    public ActionResult Put([FromBody] SettingDao updatedSettingDao)
    {
        var setting = _context.Settings.FirstOrDefault()?.Id;

        _context.Update(updatedSettingDao);

        return Ok();
    }
}