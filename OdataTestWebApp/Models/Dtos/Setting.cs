using OdataTestWebApp.Models.Daos.Setting;

namespace OdataTestWebApp.Models.Dtos;

public class Setting
{
    public bool IsProduction { get; set; } = false;
    public bool ShouldEnablePerformanceMode { get; set; } = false;
    public SettingSubItem SubItem { get; set; }
}