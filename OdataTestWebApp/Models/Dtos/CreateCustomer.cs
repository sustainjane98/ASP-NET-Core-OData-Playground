using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Dtos;

public class CreateCustomer
{
    [Required]
    public string Name { get; set; }
    
    public Order[]? Orders { get; set; }
}