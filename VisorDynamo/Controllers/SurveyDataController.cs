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
    public class SurveyDataController : Controller
    {
        metSurvey metodo = new metSurvey();
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Insert([FromBody] EntSurvey survey)
        {
             return metodo.insertSurvey(survey);
        }

    //    [HttpGet]
    //    public ActionResult ObtenerProyecto(int idProyecto)
    //    {
    //        return Redirect("/survey?id=" + idProyecto);
    //    }
    }
}