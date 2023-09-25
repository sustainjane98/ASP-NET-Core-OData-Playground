using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Update_Sub_Item_Of_Setting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SettingSubItem",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "SettingSubItem",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Lorem Ipsum", "123456778989" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SettingSubItem");

            migrationBuilder.UpdateData(
                table: "SettingSubItem",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "");
        }
    }
}
