﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Models;
using WebApplication4.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    public class ViewDataController : Controller
    {
        private readonly AesContext _aesContext;

        public ViewDataController(AesContext aesContext)
        {
            _aesContext = aesContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FindCompoentInComponentType()
        {

            var vm = new FindCompoentInComponentTypeViewModel();
            vm.CompoentTypeSelectListItems = new List<SelectListItem>();

            foreach (var componentType in _aesContext.ComponentType.ToList())
            {
                vm.CompoentTypeSelectListItems.Add(new SelectListItem
                {
                    Text = componentType.ComponentName,
                    Value = componentType.ComponentTypeId.ToString()
                });
            }

            return View(vm);
        }
        public IActionResult FindComponentTypeInCategory()
        {
            var vm = new FindComponentTypeInCategory();
            vm.CategorySelectListItems = new List<SelectListItem>();

            foreach (var Category in _aesContext.Category.ToList())
            {
                vm.CategorySelectListItems.Add(new SelectListItem
                {
                    Text = Category.Name,
                    Value = Category.CategoryId.ToString()
                });
            }

            return View(vm);

        }

        public IActionResult SearchComponent()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SearchComponentResult(searchViewModel vm)
        {
            var result = from b in _aesContext.Component
                         where b.SerialNo.StartsWith(vm.searchKeyword)
                         select b;

            return View(result);

        }

        [HttpPost]
        public IActionResult FindCompoentInComponentTypeResult(FindCompoentInComponentTypeViewModel vm)
        {
            var result = from b in _aesContext.Component
                where b.ComponentTypeId.Equals(long.Parse(vm.SelectCompoentTypeId))
                select b;

            return View(result);
        }
    

    [HttpPost]
    public IActionResult FindComponentTypeInCategoryResult(FindComponentTypeInCategory vm)
    {
        var t = _aesContext.ComponentType.ToList();

        var findLinks = from b in _aesContext.CategoryComponentType
                                 where b.CategoryId.Equals(int.Parse(vm.SelectCategoryId))
                                 select b;

        var links = findLinks.ToList();
        var result = new List<Category.ComponentType>();
        foreach (var component in links)
        {
            foreach (var type in t)
            {
                if (component.ComponentTypesId == type.ComponentTypeId)
                {
                    result.Add(type);
                }
            }
        }      
            return View(result);
    }
}
}