using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApplication4.ViewModels
{
    public class FindComponentTypeInCategory
    {
        public String SelectCategoryId { set; get; }
        public List<SelectListItem> CategorySelectListItems { set; get; }
    }
}
