using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Dtos;
using Riok.Mapperly.Abstractions;

namespace OdataTestWebApp.Mappers;

[Mapper]
public static partial class OrderMapper
{
    public static partial Order ToOrder(this OrderDao orderDao);

}