using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using aspnetcorewebapi.model;

namespace aspnetcorewebapi.Migrations
{
    [DbContext(typeof(AesSmallContext))]
    partial class AesSmallContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("aspnetcorewebapi.model.Component", b =>
                {
                    b.Property<long>("ComponentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<int>("ComponentNumber");

                    b.Property<long>("ComponentTypeId");

                    b.Property<long?>("CurrentLoanInformationId");

                    b.Property<string>("SerialNo");

                    b.Property<string>("UserComment");

                    b.HasKey("ComponentId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("Component");
                });

            modelBuilder.Entity("aspnetcorewebapi.model.ComponentType", b =>
                {
                    b.Property<long>("ComponentTypeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<string>("ComponentName");

                    b.Property<string>("Manufacturer");

                    b.HasKey("ComponentTypeId");

                    b.ToTable("ComponentType");
                });

            modelBuilder.Entity("aspnetcorewebapi.model.Component", b =>
                {
                    b.HasOne("aspnetcorewebapi.model.ComponentType")
                        .WithMany("Components")
                        .HasForeignKey("ComponentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
