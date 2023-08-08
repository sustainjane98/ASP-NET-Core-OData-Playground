using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Dtos;
using Riok.Mapperly.Abstractions;

namespace OdataTestWebApp.Mappers;

[Mapper]
public static partial class CustomerMapper
{
    [MapperIgnoreSource(nameof(CustomerDao.Id))]
    [MapperIgnoreSource(nameof(CustomerDao.Orders))]
    public static partial CreateCustomer CustomerDaoToCreateCustomerDto(this CustomerDao customerDao);
    
    public static partial Customer CustomerDaoToCustomerDto(this CustomerDao customerDao);
    
    public static partial CustomerDao CustomerDtoToCustomerDao(this Customer customerDto);
    
    [MapperIgnoreTarget(nameof(CustomerDao.Id))]
    [MapperIgnoreTarget(nameof(CustomerDao.Orders))]
    public static partial CustomerDao CreateCustomerDtoToCustomerDao(this CreateCustomer createCustomerDto);
    
    public static partial IQueryable<Customer> CustomerDaoToCustomerDto(this IQueryable<CustomerDao> customerDaos);
}