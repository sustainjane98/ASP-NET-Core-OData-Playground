using Microsoft.EntityFrameworkCore;
using Npgsql;
using OdataTestWebApp.Models.Daos;
using OdataTestWebApp.Models.Daos.Setting;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerDao>().HasMany(e => e.Orders).WithOne(e => e.Customer).HasForeignKey(e => e.CustomerId);
        modelBuilder.Entity<SettingDao>().HasOne(e => e.SubItem).WithOne(e => e.Setting).HasForeignKey<SettingDao>(e => e.SubItemId).IsRequired();
        modelBuilder.Entity<SettingDao>().HasData(new SettingDao()
        {
            Id = 1,
            IsProduction = true,
            ShouldEnablePerformanceMode = true,
            SubItemId = 1
        });
        modelBuilder.Entity<SettingSubItemDao>().HasData(new SettingSubItemDao()
        {
            Id = 1,
            Name = "",
            SettingId = 1
        });
    }
}   