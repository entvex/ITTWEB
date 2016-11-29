using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApplication4.Models
{
    public class ComponentCategoryViewModel
    {
        public int CategoryID { set; get; }
        public List<SelectListItem> Category { set; get; }
        public string NameChange { set; get; }
    }
}