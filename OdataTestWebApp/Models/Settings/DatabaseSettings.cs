using System.ComponentModel.DataAnnotations;

namespace OdataTestWebApp.Models.Settings;

public class DatabaseSettings
{
    [Required]
    public string Database { get; set; }
    [Required]
    public string Host { get; set; }
    [Required]
    public int Port { get; set; }
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
}