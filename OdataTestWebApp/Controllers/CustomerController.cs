using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Mappers;
using OdataTestWebApp.Models.Dtos;

namespace OdataTestWebApp.Controllers;

public class CustomerController : ODataController
{
    private readonly AppDbContext _context;


    public CustomerController(AppDbContext context)
    {
        _context = context;
    }

    [EnableQuery(PageSize = 6)]
    public ActionResult<IQueryable<Customer>> Get()
    {
        return Ok(_context.Customers.AsSplitQuery().CustomerDaoToCustomerDto());
    }

    [EnableQuery]
    public async Task<ActionResult<IQueryable<Customer>>> Get([FromRoute] int key)
    {
        return Ok((await _context.Customers.AsSplitQuery().FirstOrDefaultAsync(c => c.Id == key))?.CustomerDaoToCustomerDto());
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CreateCustomer c)
    {
        var customerDao = c.CreateCustomerDtoToCustomerDao();
        _context.Customers.Add(customerDao);
        await _context.SaveChangesAsync();
        return Created(customerDao.Id);
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromRoute] int key, [FromBody] Customer updatedCustomer)
    {
        var updatedCustomerDao = updatedCustomer.CustomerDtoToCustomerDao();
        updatedCustomerDao.Id = key;
        _context.Customers.Update(updatedCustomerDao);
        await _context.SaveChangesAsync();
        return Updated(updatedCustomerDao.Id);
    }

    
    public async Task<ActionResult> Patch([FromRoute] int key, [FromBody] Delta<Customer> delta)
    {
        var customer = _context.Customers.SingleOrDefault(d => d.Id == key);
        if (customer == null)
        {
            return NotFound();
        }
        delta.Patch(customer.CustomerDaoToCustomerDto());
        await _context.SaveChangesAsync();
        return Updated(customer.Id);
    }
    
    public async Task<ActionResult> Delete([FromRoute] int key)
    {
        var customer = _context.Customers.SingleOrDefault(d => d.Id == key);
        if (customer != null)
        {
            _context.Customers.Remove(customer);
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }
    
    [HttpGet("[controller]/mostRecent()")]
    public async Task<IActionResult> MostRecent()
    {
        var latestCustomerDao = await _context.Customers.OrderByDescending(customer => customer.Updated).FirstOrDefaultAsync();
        return Ok(latestCustomerDao);
    }
    
    [HttpGet("ReturnMostRecentCustomer()")]
    public async Task<IActionResult> ReturnMostRecentCustomer()
    {
        var latestCustomerDao = await _context.Customers.OrderByDescending(customer => customer.Updated).FirstOrDefaultAsync();
        return Ok(latestCustomerDao);
    }
    
    [HttpPut("[controller]({key:int})/ResetName")]
    public async Task<IActionResult> ResetName([FromODataUri] int key, ODataActionParameters parameters)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState.ValidationState);
        }

        var updatedCustomerDao = await _context.Customers.FirstOrDefaultAsync((customer) => customer.Id == key);


        if (updatedCustomerDao is null)
        {
            return NotFound();
        }
        
        updatedCustomerDao.Name = "";

        return Ok();
    }
    
    
}