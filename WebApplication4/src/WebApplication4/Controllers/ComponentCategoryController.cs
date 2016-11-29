using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.DotNet.Cli.Utils;
using WebApplication4.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    public class ComponentCategoryController : Controller
    {

        private AesContext _aesContext;

        public ComponentCategoryController(AesContext aesContext)
        {
            _aesContext = aesContext;
        }



        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Edit()
        {
            var categoryList = _aesContext.Category.ToList();
            var vm = new ComponentCategoryViewModel();
            vm.Category = new List<SelectListItem>();

            foreach (var category in categoryList)
            {
                vm.Category.Add(new SelectListItem
                {
                    Text = category.Name,
                    Value = category.CategoryId.ToString()
                });
            }
            return View(vm);
        }

        public IActionResult Remove()
        {
            var categoryList = _aesContext.Category.ToList();
            var vm = new ComponentCategoryViewModel();
            vm.Category = new List<SelectListItem>();

            foreach (var category in categoryList)
            {
                vm.Category.Add(new SelectListItem
                {
                    Text = category.Name,
                    Value = category.CategoryId.ToString()
                });
            }

            return View(vm);
        }

        [HttpPost]
        public IActionResult Remove(Category category)
        {

                if (ModelState.IsValid)
            {
                var firstOrDefault = _aesContext.Category.FirstOrDefault(b => b.CategoryId == category.CategoryId);
                _aesContext.Category.Remove(firstOrDefault);
                _aesContext.SaveChanges();
                    return RedirectToAction("Index");
                }

            return View();
        }

        [HttpPost]
        public IActionResult Edit(ComponentCategoryViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var firstOrDefault = _aesContext.Category.FirstOrDefault(b => b.CategoryId == vm.CategoryID);
                firstOrDefault.Name = vm.NameChange;
                _aesContext.Category.Update(firstOrDefault);
                _aesContext.SaveChanges();
                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpPost]
        public IActionResult Create(Category category)
        {
            if (!string.IsNullOrWhiteSpace(category.Name))
            {
                if (ModelState.IsValid)
                {
                    _aesContext.Category.Add(category);
                    _aesContext.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            return View();
        }
    }
}
