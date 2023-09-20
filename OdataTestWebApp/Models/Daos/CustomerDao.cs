using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace OdataTestWebApp.Models.Daos;

[Table("Customers")]
[Index(nameof(Name), IsUnique = true)]
public class CustomerDao
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public List<OrderDao>? Orders { get; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Created { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime Updated { get; set; }
}