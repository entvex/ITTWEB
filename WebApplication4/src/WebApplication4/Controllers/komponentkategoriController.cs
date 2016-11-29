using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication4.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication4.Controllers
{
    public class KomponentkategoriController : Controller
    {

        private AesContext _aesContext;

        public KomponentkategoriController(AesContext aesContext)
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
            return View();
        }

        public IActionResult Remove()
        {
            List<Category> category = _aesContext.Category.ToList();
            return View(category);
        }

        [HttpPost]
        public IActionResult Remove(Category category)
        {
            if (ModelState.IsValid)
            {
                _aesContext.Category.Remove(category);
                _aesContext.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Create( Category category )
        {
            if (ModelState.IsValid)
            {
                _aesContext.Category.Add(category);
                _aesContext.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();
        }
    }
}
