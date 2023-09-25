using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Dtos;

public class CreateCustomer: UpdateCustomer
{
    public List<CreateOrder> Orders { get; set; } = new();
}