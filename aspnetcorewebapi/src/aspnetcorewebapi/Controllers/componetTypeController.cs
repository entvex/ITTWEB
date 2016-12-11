using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using aspnetcorewebapi.model;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcorewebapi.Controllers
{
    [Route("api/componenttype")]
    public class componetTypeController : Controller
    {
        private readonly AesSmallContext _aesSmallContext;

        public componetTypeController( AesSmallContext aesSmallContext )
        {
            _aesSmallContext = aesSmallContext;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = from b in _aesSmallContext.ComponentType where b.ComponentTypeId == id select b;
            if (result.FirstOrDefault() == null)
            {
                return NotFound();
            }
            return new ObjectResult(result.FirstOrDefault());
        }

        [HttpPost]
        public IActionResult Post(ComponentType componentType)
        {
            _aesSmallContext.ComponentType.Add(componentType);
            _aesSmallContext.SaveChanges();

            return new ObjectResult(componentType);
        }
    }
}
