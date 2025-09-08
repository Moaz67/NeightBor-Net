using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeighrBor_Net.Migrations
{
    /// <inheritdoc />
    public partial class comment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Coments");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_PostId",
                table: "Coments",
                newName: "IX_Coments_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coments",
                table: "Coments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coments_Posts_PostId",
                table: "Coments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coments",
                table: "Coments");

            migrationBuilder.RenameTable(
                name: "Coments",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_Coments_PostId",
                table: "Comments",
                newName: "IX_Comments_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
