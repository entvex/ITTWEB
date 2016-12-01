using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApplication4.ViewModels
{
    public class ComponentTypeViewModel
    {
        public long ComponentTypeId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentInfo { get; set; }
        public string Location { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }

        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }

        public string AdminComment { get; set; }

        public List<SelectListItem> ComponentStatuSelectListItems { set; get; }

        public string SelectedStatus { get; set; }



    }
}