using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApplication4.ViewModels
{
    public class ComponentViewModel
    {

        public int ComponentId { set; get; }
        public int ComponentNumber { set; get; }
        public string SerialNo { set; get; }
        public string AdminComment { set; get; }

        public List<SelectListItem> Status { set; get; }
        public string SelectedStatus { set; get; }
        public string SelectedComponentId { set; get; }

        public List<SelectListItem> ComponentTypeSelectListItems { set; get; }
        public List<SelectListItem> ComponentsSelectListItems { set; get; }

        public string SelectedComponentType { set; get; }
    }
}
