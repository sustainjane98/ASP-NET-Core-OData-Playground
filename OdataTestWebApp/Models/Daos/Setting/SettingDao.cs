using System.ComponentModel.DataAnnotations.Schema;

namespace OdataTestWebApp.Models.Daos.Setting;

[Table("Setting")]
public class SettingDao
{
    public int Id { get; set; }
    public bool IsProduction { get; set; } = false;
    public bool ShouldEnablePerformanceMode { get; set; } = false;
    public SettingSubItemDao SubItem { get; }
    public int SubItemId { get; set; }

}