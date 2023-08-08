using Microsoft.EntityFrameworkCore;
using Npgsql;
using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Settings;

namespace OdataTestWebApp.Configurations;

public class AppDbContext: DbContext
{
    private readonly DatabaseSettings _databaseSettings;

    public AppDbContext(DbContextOptions<AppDbContext> options, DatabaseSettings databaseSettings): base(options)
    {
        _databaseSettings = databaseSettings;
    }

    public required DbSet<CustomerDao> Customers { get; set; }
    public required DbSet<OrderDao> Orders { get; set; }
    public required DbSet<SettingDao> Settings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connection = new NpgsqlConnectionStringBuilder
        {
            Database = _databaseSettings.Database,
            Host = _databaseSettings.Host,
            Port = _databaseSettings.Port,
            Password = _databaseSettings.Password,
            Username = _databaseSettings.Username
        };

        optionsBuilder.UseNpgsql(connection.ToString());
    }
}   