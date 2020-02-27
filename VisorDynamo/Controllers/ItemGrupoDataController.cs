using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VisorDynamo.Models.Entities;
using VisorDynamo.Models.Methods;
using MySql.Data.MySqlClient;
using System.Data;
using System.IO;

namespace VisorDynamo.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class ItemGrupoDataController : Controller
    {
        metItemGrupo metodo = new metItemGrupo();
        
        public IActionResult Index()
        {
            return View();
        }
        public string Insert([FromBody] EntItemGrupo grupo)
        {
            //return metodo.insertItemGrupo(grupo);
            return metodo.insertItemGrupo(grupo);
        }
        public string Delete([FromBody] EntItemGrupo grupo)
        {
            //return metodo.insertItemGrupo(grupo);
            return metodo.deleteItemGrupo(grupo);
        }

        public string Edit([FromBody] EntItemGrupoDet grupoDet)
        {
            return metodo.editarItemGrupo(grupoDet);
        }

        public string DeleteDetails([FromBody] EntItemGrupoDet grupoDet) 
        {
            return metodo.deleteGrupoDet(grupoDet);
        }

        public string Associate([FromBody] EntItemGrupoDet grupoDet) {
            return metodo.associateGrupo(grupoDet);
        }
    }
}