using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Dtos;

public class UpdateCustomer
{
    [Required]
    public string Name { get; set; }
}