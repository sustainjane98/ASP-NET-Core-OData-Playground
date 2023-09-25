using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Dtos;
using Riok.Mapperly.Abstractions;

namespace OdataTestWebApp.Mappers;

[Mapper]
public static partial class CustomerMapper
{
    [MapperIgnoreSource(nameof(CustomerDao.Id))]
    [MapperIgnoreSource(nameof(CustomerDao.Orders))]
    public static partial CreateCustomer ToCreateCustomerDto(this CustomerDao customerDao);
    
    public static partial Customer ToCustomerDto(this CustomerDao customerDao);
    
    public static partial IQueryable<Customer> ToIQueryableCustomerDto(this IQueryable<CustomerDao> customerDao);
    
    
    public static partial CustomerDao CustomerToCustomerDao(this Customer customerDto);
    
    [MapperIgnoreTarget(nameof(CustomerDao.Id))]
    [MapperIgnoreTarget(nameof(CustomerDao.Orders))]
    public static partial CustomerDao CreateCustomerToCustomerDao(this CreateCustomer createCustomerDto);
    
    public static partial IQueryable<Customer> ToCustomerDto(this IQueryable<CustomerDao> customerDaos);
}