using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.DotNet.Cli.Utils;
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
            return View();
        }

        public IActionResult Remove()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Create(ComponentViewModel vm)
        {
            if (!string.IsNullOrWhiteSpace(vm.ComponentNumber.ToString()))
            {

               
                if (ModelState.IsValid)
                {
                    _aesContext.Component.Add(new Category.Component
                    {
                        AdminComment = vm.AdminComment,
                        ComponentNumber = vm.ComponentNumber,
                        ComponentTypeId = 1, //placeholder for now
                        SerialNo = vm.SerialNo,
                        Status = Category.ComponentStatus.Available //placeholder
                    });
                    _aesContext.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            return View();
        }

    }
}
