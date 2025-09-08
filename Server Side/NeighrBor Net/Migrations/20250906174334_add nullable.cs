using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeighrBor_Net.Migrations
{
    /// <inheritdoc />
    public partial class addnullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments");

            migrationBuilder.AlterColumn<long>(
                name: "PostId",
                table: "Coments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Detail",
                table: "Coments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments");

            migrationBuilder.AlterColumn<long>(
                name: "PostId",
                table: "Coments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "Detail",
                table: "Coments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
