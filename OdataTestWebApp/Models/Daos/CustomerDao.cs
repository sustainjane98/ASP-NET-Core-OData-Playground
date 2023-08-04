namespace OdataTestWebApp.Models.Daos;

public class CustomerDao
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<OrderDao>? Orders { get; set; }
}