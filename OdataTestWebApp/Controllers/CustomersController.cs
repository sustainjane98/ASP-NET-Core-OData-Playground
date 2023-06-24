using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using OdataTestWebApp.Models;

namespace OdataTestWebApp.Controllers;


    public class CustomersController : ODataController
    {
        private static readonly Random Random = new Random();
        private static readonly List<Customer> Customers = new List<Customer>(
            Enumerable.Range(1, 3).Select(idx => new Customer
            {
                Id = idx,
                Name = $"Customer {idx}",
                Orders = new List<Order>(
                    Enumerable.Range(1, 2).Select(dx => new Order
                    {
                        Id = (idx - 1) * 2 + dx,
                        Amount = Random.Next(1, 9) * 10
                    }))
            }));

        [EnableQuery]
        public ActionResult<IEnumerable<Customer>> Get()
        {
            return Ok(Customers);
        }

        [EnableQuery]
        public ActionResult<Customer> Get([FromRoute] int key)
        {
            var item = Customers.SingleOrDefault(d => d.Id.Equals(key));

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
    }