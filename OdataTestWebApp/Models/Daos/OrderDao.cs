using System.ComponentModel.DataAnnotations.Schema;

namespace OdataTestWebApp.Models.Daos;

[Table("Orders")]
public class OrderDao
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    
    [Column("CustomerId")]
    public int CustomerId { get; set; }
    public CustomerDao? Customer { get; set; }
}