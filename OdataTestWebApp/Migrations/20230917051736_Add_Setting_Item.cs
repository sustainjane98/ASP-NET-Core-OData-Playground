using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Add_Setting_Item : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubItemId",
                table: "Setting",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SettingSubItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SettingId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingSubItem", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Setting_SubItemId",
                table: "Setting",
                column: "SubItemId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Setting_SettingSubItem_SubItemId",
                table: "Setting",
                column: "SubItemId",
                principalTable: "SettingSubItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Setting_SettingSubItem_SubItemId",
                table: "Setting");

            migrationBuilder.DropTable(
                name: "SettingSubItem");

            migrationBuilder.DropIndex(
                name: "IX_Setting_SubItemId",
                table: "Setting");

            migrationBuilder.DropColumn(
                name: "SubItemId",
                table: "Setting");
        }
    }
}
