using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication4.Models
{
    public class AesContext : DbContext
    {
        public AesContext(DbContextOptions<AesContext> options)
            : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategoryComponentType>().HasKey(x => new { x.ComponentTypesId, x.CategoryId });
        }

        public DbSet<Category> Category { get; set; }
        public DbSet<Category.ComponentType> ComponentType { get; set; }
        public DbSet<Category.Component> Component { get; set; }
        public DbSet<Category.ESImage> EsImage { get; set; }
    }

    public class CategoryComponentType
    {
        public int ComponentTypesId { get; set; }
        public Category.ComponentType ComponentType { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }

    public class Category
    {
        public Category()
        {
            ComponentTypes = new List<CategoryComponentType>();
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryComponentType> ComponentTypes { get; protected set; }

        public class ComponentType
        {
            public ComponentType()
            {
                Components = new List<Component>();
                Categories = new List<Category>();
            }

            public long ComponentTypeId { get; set; }
            public string ComponentName { get; set; }
            public string ComponentInfo { get; set; }
            public string Location { get; set; }
            public ComponentTypeStatus Status { get; set; }
            public string Datasheet { get; set; }
            public string ImageUrl { get; set; }
            public string Manufacturer { get; set; }
            public string WikiLink { get; set; }
            public string AdminComment { get; set; }
            public virtual ESImage Image { get; set; }
            public ICollection<Component> Components { get; protected set; }
            public ICollection<Category> Categories { get; protected set; }
        }

        public class Component
        {
            public long ComponentId { get; set; }
            public long ComponentTypeId { get; set; }
            public int ComponentNumber { get; set; }
            public string SerialNo { get; set; }
            public ComponentStatus Status { get; set; }
            public string AdminComment { get; set; }
            public string UserComment { get; set; }
            public long? CurrentLoanInformationId { get; set; }
        }

        public class ESImage
        {
            public long ESImageId { get; set; }

            [MaxLength(128)]
            public string ImageMimeType { get; set; }

            public byte[] Thumbnail { get; set; }
            public byte[] ImageData { get; set; }
        }

        public enum ComponentTypeStatus
        {
            Available,
            ReservedAdmin
        }

        public enum ComponentStatus
        {
            Available,
            ReservedLoaner,
            ReservedAdmin,
            Loaned,
            Defect,
            Trashed,
            Lost,
            NeverReturned
        }
    }
}