using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplication4.Models;
using WebApplication4.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    public class ComponentController : Controller
    {

        private AesContext _aesContext;

        public ComponentController(AesContext aesContext)
        {
           _aesContext = aesContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Edit()
        {
            var componentList = _aesContext.Component.ToList();
            var vm = new ComponentViewModel();
            vm.Status = new List<SelectListItem>();
            vm.ComponentsSelectListItems = new List<SelectListItem>();
            vm.ComponentTypeSelectListItems = new List<SelectListItem>();

            foreach (var component in componentList)
            {
                vm.ComponentsSelectListItems.Add(new SelectListItem
                {
                    Text = component.SerialNo,
                    Value = component.ComponentId.ToString()
                });
            }

            foreach (var componentType in _aesContext.ComponentType.ToList())
            {
                vm.ComponentTypeSelectListItems.Add(new SelectListItem
                {
                    Text = componentType.ComponentName,
                    Value = componentType.ComponentTypeId.ToString()
                });
            }

            foreach (String component in Enum.GetNames(typeof(Category.ComponentStatus)))
            {
                vm.Status.Add(new SelectListItem
                {
                    Text = component,
                    Value = component
                });
            }
            return View(vm);            
        }

        public IActionResult Remove()
        {
            var vm = RenderRemoveViewModel();

            return View(vm);
        }

        private ComponentViewModel RenderRemoveViewModel()
        {
            var vm = new ComponentViewModel();
            vm.ComponentTypeSelectListItems = new List<SelectListItem>();

            foreach (var component in _aesContext.Component.ToList())
            {
                vm.ComponentTypeSelectListItems.Add(new SelectListItem
                {
                    Text = component.ComponentNumber.ToString(),
                    Value = component.ComponentId.ToString()
                });
            }
            return vm;
        }

        public IActionResult Create()
        {
            return View(CreateComponentViewModel());
        }

        private ComponentViewModel CreateComponentViewModel()
        {
            var vm = new ComponentViewModel();
            vm.Status = new List<SelectListItem>();
            vm.ComponentTypeSelectListItems = new List<SelectListItem>();

            foreach (String component in Enum.GetNames(typeof(Category.ComponentStatus)))
            {
                vm.Status.Add(new SelectListItem
                {
                    Text = component,
                    Value = component
                });
            }

            foreach (var componentType in _aesContext.ComponentType.ToList())
            {
                vm.ComponentTypeSelectListItems.Add(new SelectListItem
                {
                    Text = componentType.ComponentName,
                    Value = componentType.ComponentTypeId.ToString()
                });
            }
            return vm;
        }

        [HttpPost]
        public IActionResult Remove(ComponentViewModel vm)
        {
            if (string.IsNullOrWhiteSpace(vm.SelectedComponentId))
            {
                ModelState.AddModelError(nameof(vm.SelectedComponentId), "vælg en komponet");
            }

            if (ModelState.IsValid)
            {
                var firstOrDefault = _aesContext.Component.FirstOrDefault(b => b.ComponentId == int.Parse(vm.SelectedComponentId));
                _aesContext.Component.Remove(firstOrDefault);
            }
            else
            {
                //Stay on page and try again.
                return View(RenderRemoveViewModel());
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult Create(ComponentViewModel vm)
        {
            if (string.IsNullOrWhiteSpace(vm.SerialNo))
            {
                ModelState.AddModelError(nameof(vm.SerialNo),"tast et komponet serial nummer");
            }


            int parseResult;
            int.TryParse(vm.ComponentNumber.ToString(), out parseResult);
            if (parseResult <= 0)
            {
                ModelState.AddModelError(nameof(vm.SerialNo), "tast et positiv komponet component nummer");
            }

            if (ModelState.IsValid)
            {
                Category.ComponentStatus choosenComponentStatus;
                Enum.TryParse(vm.SelectedStatus, out choosenComponentStatus);

                _aesContext.Component.Add(new Category.Component
                {
                    AdminComment = vm.AdminComment,
                    ComponentNumber = vm.ComponentNumber,
                    SerialNo = vm.SerialNo,
                    Status = choosenComponentStatus,
                    ComponentTypeId = long.Parse(vm.SelectedComponentType)

                });

                _aesContext.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                //Stay on page and try again.
                return View(CreateComponentViewModel());
            }
        }
    }
}