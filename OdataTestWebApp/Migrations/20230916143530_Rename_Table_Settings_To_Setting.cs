using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Rename_Table_Settings_To_Setting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable("Settings", null, "Setting", null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable("Setting", null, "Settings", null);
        }
    }
}
