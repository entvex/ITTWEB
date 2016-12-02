using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApplication4.ViewModels
{
    public class FindCompoentInComponentTypeViewModel
    {
        public String SelectCompoentTypeId { set; get; }
        public List<SelectListItem> CompoentTypeSelectListItems { set; get; }
    }
}