using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeighrBor_Net.Migrations
{
    /// <inheritdoc />
    public partial class adddetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Coments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detail",
                table: "Coments");
        }
    }
}
