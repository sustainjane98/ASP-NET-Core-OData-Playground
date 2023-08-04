using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Mappers;
using OdataTestWebApp.Models;
using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Dtos;

namespace OdataTestWebApp.Controllers;

public class CustomerController : ODataController
{
    private readonly OdatatestWebAppDbContext _context;


    public CustomerController(OdatatestWebAppDbContext context)
    {
        _context = context;
    }

    [EnableQuery]
    public ActionResult<IEnumerable<CustomerDao>> Get()
    {
        return Ok();
    }

    [EnableQuery]
    public async Task<ActionResult<CustomerDao>> Get([FromRoute] int key)
    {
        return Ok(await _context.Customers.FirstOrDefaultAsync(c => c.Id == key));
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CreateCustomerDto c)
    {
        _context.Customers.Add(c.CreateCustomerDtoToCustomerDao());
        await _context.SaveChangesAsync();
        return Ok();
    }
}