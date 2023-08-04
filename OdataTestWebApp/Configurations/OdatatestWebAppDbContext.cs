using Microsoft.EntityFrameworkCore;
using Npgsql;
using OdataTestWebApp.Models.Daos;

namespace OdataTestWebApp.Configurations;

public class OdatatestWebAppDbContext: DbContext
{
    private readonly IConfiguration _configuration;

    public OdatatestWebAppDbContext(DbContextOptions<OdatatestWebAppDbContext> options, IConfiguration configuration): base(options)
    {
        _configuration = configuration;
    }

    public DbSet<CustomerDao> Customers { get; set; }
    public DbSet<OrderDao> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connection = new NpgsqlConnectionStringBuilder
        {
            Database = _configuration.GetValue<string>("Database:Database"),
            Host = _configuration.GetValue<string>("Database:Host"),
            Port = _configuration.GetValue<int>("Database:Port"),
            Password = _configuration.GetValue<string>("Database:Password"),
            Username = _configuration.GetValue<string>("Database:Username")
        };

        optionsBuilder.UseNpgsql(connection.ToString());
    }
}   