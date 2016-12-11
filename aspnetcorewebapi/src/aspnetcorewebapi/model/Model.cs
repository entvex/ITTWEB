using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace aspnetcorewebapi.model
{
    public class AesSmallContext : DbContext
    {
        public AesSmallContext(DbContextOptions<AesSmallContext> options)
            : base(options)
        { }
        public DbSet<ComponentType> ComponentType { get; set; }
        public DbSet<Component> Component { get; set; }
    }

        public class ComponentType
        {
            public ComponentType()
            {
                Components = new List<Component>();
            }
            public long ComponentTypeId { get; set; }
            public string ComponentName { get; set; }
            public string Manufacturer { get; set; }
            public string AdminComment { get; set; }
            public ICollection<Component> Components { get; protected set; }
        }

        public class Component
        {
            public long ComponentId { get; set; }
            public long ComponentTypeId { get; set; }
            public int ComponentNumber { get; set; }
            public string SerialNo { get; set; }
            public string AdminComment { get; set; }
            public string UserComment { get; set; }
            public long? CurrentLoanInformationId { get; set; }
        }
}