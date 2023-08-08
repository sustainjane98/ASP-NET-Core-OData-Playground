using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Dtos;

public class Customer
{
    [Key]
    public string Name { get; set; }
    public List<Order>? Orders { get; set; }
}