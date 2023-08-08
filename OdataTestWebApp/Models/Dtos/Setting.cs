using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Daos;

public class Setting
{
    public int Id { get; set; }
    public bool IsProduction { get; set; } = false;
    public bool ShouldEnablePerformanceMode { get; set; } = false;

}