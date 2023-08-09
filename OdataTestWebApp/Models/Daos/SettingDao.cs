using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OdataTestWebApp.Models.Daos;

[Table("Setting")]
public class SettingDao
{
    public int Id { get; set; }
    public bool IsProduction { get; set; } = false;
    public bool ShouldEnablePerformanceMode { get; set; } = false;

}