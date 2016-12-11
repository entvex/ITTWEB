using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace aspnetcorewebapi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ComponentType",
                columns: table => new
                {
                    ComponentTypeId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdminComment = table.Column<string>(nullable: true),
                    ComponentName = table.Column<string>(nullable: true),
                    Manufacturer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentType", x => x.ComponentTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Component",
                columns: table => new
                {
                    ComponentId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdminComment = table.Column<string>(nullable: true),
                    ComponentNumber = table.Column<int>(nullable: false),
                    ComponentTypeId = table.Column<long>(nullable: false),
                    CurrentLoanInformationId = table.Column<long>(nullable: true),
                    SerialNo = table.Column<string>(nullable: true),
                    UserComment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Component", x => x.ComponentId);
                    table.ForeignKey(
                        name: "FK_Component_ComponentType_ComponentTypeId",
                        column: x => x.ComponentTypeId,
                        principalTable: "ComponentType",
                        principalColumn: "ComponentTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Component_ComponentTypeId",
                table: "Component",
                column: "ComponentTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Component");

            migrationBuilder.DropTable(
                name: "ComponentType");
        }
    }
}
