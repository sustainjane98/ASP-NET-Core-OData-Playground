using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Update_Index_Customers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Customers_Name",
                table: "Customers",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Customers_Name",
                table: "Customers");
        }
    }
}
