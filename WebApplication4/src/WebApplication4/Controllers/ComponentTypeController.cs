using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplication4.Models;
using WebApplication4.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    public class ComponentTypeController : Controller
    {

        private AesContext _aesContext;

        public ComponentTypeController(AesContext aesContext)
        {
            _aesContext = aesContext;
        }
        public IActionResult Index()
        {

            var vm = new ComponentTypeViewModel();
            vm.ComponentStatuSelectListItems = new List<SelectListItem>();


            foreach (String status in Enum.GetNames(typeof(Category.ComponentTypeStatus)))
            {
                vm.ComponentStatuSelectListItems.Add(new SelectListItem
                {
                    Text = status,
                    Value = status
                });
            }

            return View(vm);
        }

        [HttpPost]
        public IActionResult Create(ComponentTypeViewModel vm)
        {
            Category.ComponentTypeStatus choosenComponentTypeStatus;
            Enum.TryParse(vm.SelectedStatus, out choosenComponentTypeStatus);

            _aesContext.ComponentType.Add(new Category.ComponentType
            {
                ComponentName = vm.ComponentName,
                ComponentInfo = vm.ComponentInfo,
                Location = vm.Location,
                Status = choosenComponentTypeStatus,
                Datasheet = vm.Datasheet,
                ImageUrl = vm.ImageUrl,
                Manufacturer = vm.Manufacturer,
                WikiLink = vm.WikiLink,
                AdminComment = vm.AdminComment

            });
            _aesContext.SaveChanges();
            return RedirectToAction("Index");

 
        }
    }
}
