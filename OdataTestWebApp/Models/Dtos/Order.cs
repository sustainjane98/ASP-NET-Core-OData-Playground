namespace OdataTestWebApp.Models.Dtos;

public class Order: CreateOrder
{
    public int Id { get; set; }
    
    public int CustomerId { get; set; }
}