using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Dtos;
using Riok.Mapperly.Abstractions;

namespace OdataTestWebApp.Mappers;

[Mapper]
public static partial class CustomerMapper
{
    public static partial CreateCustomerDto CustomerDaoToCreateCustomerDto(this CustomerDao dao);
    
    public static partial CustomerDao CreateCustomerDtoToCustomerDao(this CreateCustomerDto dao);
}