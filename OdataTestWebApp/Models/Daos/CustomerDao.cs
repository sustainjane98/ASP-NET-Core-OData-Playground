using System.ComponentModel.DataAnnotations.Schema;

namespace OdataTestWebApp.Models.Daos;

[Table("Customers")]
public class CustomerDao
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<OrderDao>? Orders { get; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Created { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime Updated { get; set; }
}