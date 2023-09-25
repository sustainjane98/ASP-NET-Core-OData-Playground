using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OdataTestWebApp.Configurations;
using OdataTestWebApp.Mappers;
using OdataTestWebApp.Models.Daos;
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
        return Ok(_context.Customers.ToIQueryableCustomerDto());
    }

    [EnableQuery]
    public ActionResult<IQueryable<Customer>> Get([FromRoute] int key)
    {
        return Ok((_context.Customers.Where(c => c.Id == key)).ToIQueryableCustomerDto());
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CreateCustomer c)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            

            var customerDao = c.CreateCustomerToCustomerDao();
            _context.Customers.Add(customerDao);
            await _context.SaveChangesAsync();

            var customerDto = customerDao.ToCustomerDto();
            
            if (c.Orders is {Count: > 0})
            {
                
                foreach(Order order in c.Orders)
                {
                    
                    var orderDao = new OrderDao()
                    {
                        CustomerId = customerDao.Id,
                        Amount = order.Amount
                    };
                    
                    _context.Orders.Add(orderDao);
                    await _context.SaveChangesAsync();
                    
                    customerDto.Orders.Add(orderDao.ToOrder());
                }

                
            }
            
            return Created(customerDao.ToCustomerDto());
        }
        catch (DbUpdateException dbUpdateException)
        {
            return Conflict(dbUpdateException.Message);
        }
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromRoute] int key, [FromBody] UpdateCustomer updatedCustomer)
    {
        try
        {
            var foundCustomer = await _context.Customers.FirstOrDefaultAsync(e => e.Id.Equals(key));

            if (foundCustomer is null)
            {
                return NotFound();
            }
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            foundCustomer.Name = updatedCustomer.Name;
            await _context.SaveChangesAsync();
            return Updated(foundCustomer.ToCustomerDto());
        }
        catch (DbUpdateException dbUpdateException)
        {
            return Conflict(dbUpdateException.Message);
        }
    }

    
    public async Task<ActionResult> Patch([FromRoute] int key, [FromBody] Delta<Customer> delta)
    {
        var customer = _context.Customers.SingleOrDefault(d => d.Id == key);
        if (customer == null)
        {
            return NotFound();
        }
        delta.Patch(customer.ToCustomerDto());
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