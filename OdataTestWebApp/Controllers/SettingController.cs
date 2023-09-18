using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Mappers;
using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Daos.Setting;
using OdataTestWebApp.Models.Dtos;

namespace OdataTestWebApp.Controllers;

public class SettingController: ODataController
{
    private readonly AppDbContext _context;

    public SettingController(AppDbContext context)
    {
        _context = context;
    }
    
    public ActionResult<IQueryable<Setting>> Get()
    {
        return Ok(_context.Settings.SettingDaoToSettingDto().FirstOrDefault());
    }
    
    public ActionResult Put([FromBody] Setting updatedSettingDto)
    {

        var settingId = _context.Settings.FirstOrDefault()?.Id;

        if (settingId is null)
        {
            return NotFound();
        }

        var settingDao = updatedSettingDto.SettingDtoToSettingDao();

        settingDao.Id = (int) settingId;

        _context.Update(updatedSettingDto);

        return Ok();
    }
}