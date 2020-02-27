using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using VisorDynamo.Models.Entities;
using System.Data;
using System.IO;

namespace VisorDynamo.Models.Methods
{
    public class metSurvey
    {
        DB con = new DB();
        public string insertSurvey(EntSurvey survey)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_SURVEY_INSERT", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_idProyecto", MySqlDbType.Int32).Value = survey.idProyecto;
                cmd.Parameters.Add("_resText", MySqlDbType.VarChar).Value = survey.resText;
                cmd.Parameters.Add("_resNumero", MySqlDbType.VarChar).Value = survey.resNumero;
                cmd.ExecuteNonQuery();
                con.Close();
                Console.WriteLine("INSERT SURVEY OK");
                resultado = "exito";
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error";
                return resultado;
            }
        }

    }
}
