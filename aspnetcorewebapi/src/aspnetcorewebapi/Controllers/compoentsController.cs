using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using aspnetcorewebapi.model;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcorewebapi.Controllers
{
    [Route("api/component")]
    public class ValuesComponenttype : Controller
    {
        private readonly AesSmallContext _aesSmallContext;

        public ValuesComponenttype(AesSmallContext aesSmallContext)
        {
            _aesSmallContext = aesSmallContext;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = from b in _aesSmallContext.Component where b.ComponentId == id select b;
            if (result.FirstOrDefault() == null)
            {
                return NotFound();
            }
            return new ObjectResult(result.FirstOrDefault());
        }

        [HttpPost]
        public IActionResult Post(Component component)
        {
            _aesSmallContext.Component.Add(component);
            _aesSmallContext.SaveChanges();

            return new ObjectResult(component);
        }
    }
}