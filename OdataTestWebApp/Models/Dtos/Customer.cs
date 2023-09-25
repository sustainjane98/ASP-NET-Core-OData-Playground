using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Dtos;

public class Customer: CreateCustomer
{
    public int Id { get; set; }
    
    public new List<Order> Orders { get; set; } = new();
}