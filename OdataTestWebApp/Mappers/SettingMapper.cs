using OdataTestWebApp.Models.Daos.Setting;
using OdataTestWebApp.Models.Dtos;
using Riok.Mapperly.Abstractions;

namespace OdataTestWebApp.Mappers;

[Mapper]
public static partial class SettingMapper
{
    public static partial IQueryable<Setting> SettingDaoToSettingDto(this IQueryable<SettingDao> settingDao);
    
    public static partial SettingDao SettingDtoToSettingDao(this Setting settingDto);
}