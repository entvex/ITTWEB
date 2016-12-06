using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using WebApplication4.Models;

namespace WebApplication4.Migrations
{
    [DbContext(typeof(AesContext))]
    [Migration("20161205132436_migration")]
    partial class migration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication4.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("ComponentTypeId");

                    b.Property<string>("Name");

                    b.HasKey("CategoryId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("WebApplication4.Models.Category+Component", b =>
                {
                    b.Property<long>("ComponentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<int>("ComponentNumber");

                    b.Property<long>("ComponentTypeId");

                    b.Property<long?>("CurrentLoanInformationId");

                    b.Property<string>("SerialNo");

                    b.Property<int>("Status");

                    b.Property<string>("UserComment");

                    b.HasKey("ComponentId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("Component");
                });

            modelBuilder.Entity("WebApplication4.Models.Category+ComponentType", b =>
                {
                    b.Property<long>("ComponentTypeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<string>("ComponentInfo");

                    b.Property<string>("ComponentName");

                    b.Property<string>("Datasheet");

                    b.Property<long?>("ImageESImageId");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Location");

                    b.Property<string>("Manufacturer");

                    b.Property<int>("Status");

                    b.Property<string>("WikiLink");

                    b.HasKey("ComponentTypeId");

                    b.HasIndex("ImageESImageId");

                    b.ToTable("ComponentType");
                });

            modelBuilder.Entity("WebApplication4.Models.Category+ESImage", b =>
                {
                    b.Property<long>("ESImageId")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("ImageData");

                    b.Property<string>("ImageMimeType")
                        .HasMaxLength(128);

                    b.Property<byte[]>("Thumbnail");

                    b.HasKey("ESImageId");

                    b.ToTable("EsImage");
                });

            modelBuilder.Entity("WebApplication4.Models.CategoryComponentType", b =>
                {
                    b.Property<int>("ComponentTypesId");

                    b.Property<int>("CategoryId");

                    b.Property<long?>("ComponentTypeId");

                    b.HasKey("ComponentTypesId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("CategoryComponentType");
                });

            modelBuilder.Entity("WebApplication4.Models.Category", b =>
                {
                    b.HasOne("WebApplication4.Models.Category+ComponentType")
                        .WithMany("Categories")
                        .HasForeignKey("ComponentTypeId");
                });

            modelBuilder.Entity("WebApplication4.Models.Category+Component", b =>
                {
                    b.HasOne("WebApplication4.Models.Category+ComponentType")
                        .WithMany("Components")
                        .HasForeignKey("ComponentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApplication4.Models.Category+ComponentType", b =>
                {
                    b.HasOne("WebApplication4.Models.Category+ESImage", "Image")
                        .WithMany()
                        .HasForeignKey("ImageESImageId");
                });

            modelBuilder.Entity("WebApplication4.Models.CategoryComponentType", b =>
                {
                    b.HasOne("WebApplication4.Models.Category", "Category")
                        .WithMany("ComponentTypes")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApplication4.Models.Category+ComponentType", "ComponentType")
                        .WithMany()
                        .HasForeignKey("ComponentTypeId");
                });
        }
    }
}
