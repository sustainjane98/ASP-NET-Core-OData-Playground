using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
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

    [EnableQuery]
    public ActionResult<IQueryable<Customer>> Get()
    {
        return Ok(_context.Customers.CustomerDaoToCustomerDto());
    }

    [EnableQuery]
    public async Task<ActionResult<IQueryable<Customer>>> Get([FromRoute] int key)
    {
        return Ok((await _context.Customers.FirstOrDefaultAsync(c => c.Id == key))?.CustomerDaoToCustomerDto());
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
}