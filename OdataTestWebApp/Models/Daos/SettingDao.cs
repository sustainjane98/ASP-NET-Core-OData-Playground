using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Daos;

public class SettingDao
{
    public int Id { get; set; }
    public bool IsProduction { get; set; } = false;
    public bool ShouldEnablePerformanceMode { get; set; } = false;

}