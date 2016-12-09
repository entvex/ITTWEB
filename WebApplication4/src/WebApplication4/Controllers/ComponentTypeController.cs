using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplication4.Models;
using WebApplication4.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    [Authorize(Roles = "Admins")]
    public class ComponentTypeController : Controller
    {
        private AesContext _aesContext;
        public ComponentTypeController(AesContext aesContext)
        {
            _aesContext = aesContext;
        }
        [AllowAnonymous]
        public IActionResult Index()
        {

            var vm = new ComponentTypeViewModel();
            vm.ComponentStatuSelectListItems = new List<SelectListItem>();
            vm.CategorySelectListItems = new List<SelectListItem>();

            foreach (var Category in _aesContext.Category)
            {
                vm.CategorySelectListItems.Add(new SelectListItem
                {
                    Text = Category.Name,
                    Value = Category.CategoryId.ToString()
                });
            }

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

            //Make link between type and category

            var findCompoentType = from b in _aesContext.ComponentType
                where b.ComponentName == vm.ComponentName
                select b;

            var findCatagory = from b in _aesContext.Category
                where b.CategoryId == int.Parse(vm.SelectedCategoryId)
                select b;

            _aesContext.CategoryComponentType.Add(new CategoryComponentType
            {
                Category = findCatagory.FirstOrDefault(),
                CategoryId = findCatagory.FirstOrDefault().CategoryId,

                ComponentType = findCompoentType.FirstOrDefault(),
                ComponentTypesId = int.Parse(findCompoentType.FirstOrDefault().ComponentTypeId.ToString())
            });
            _aesContext.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
