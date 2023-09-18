using System.ComponentModel.DataAnnotations.Schema;

namespace OdataTestWebApp.Models.Daos.Setting;

[Table(name: "SettingSubItem")]
public class SettingSubItemDao
{
    public int Id { get; set; }

    public SettingDao Setting { get; }
    
    public int SettingId { get; set; }
    
    public string Name { get; set; }
}