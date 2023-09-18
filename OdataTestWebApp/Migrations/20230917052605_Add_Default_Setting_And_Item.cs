using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Add_Default_Setting_And_Item : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SettingSubItem",
                columns: new[] { "Id", "Name", "SettingId" },
                values: new object[] { 1, "", 1 });

            migrationBuilder.InsertData(
                table: "Setting",
                columns: new[] { "Id", "IsProduction", "ShouldEnablePerformanceMode", "SubItemId" },
                values: new object[] { 1, true, true, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Setting",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SettingSubItem",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
