using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using VisorDynamo.Models.Entities;
using System.Data;
using System.IO;

namespace VisorDynamo.Models.Methods{
    public class metItemGrupo{

        DB con = new DB();
        public string insertItemGrupo(EntItemGrupo grupo)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_GRUPO_AGREGAR", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_nombre", MySqlDbType.VarChar).Value = grupo.nombre;
                cmd.Parameters.Add("_tipo", MySqlDbType.VarChar).Value = grupo.tipo;
                cmd.Parameters.Add("_resultado", MySqlDbType.VarChar).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                resultado = cmd.Parameters["_resultado"].Value.ToString();
                con.Close();
                Console.WriteLine("INSERT ITEMGRUPO OK");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error: " + ex.ToString();
                return resultado;
            }
        }

        public string deleteItemGrupo(EntItemGrupo grupo)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_GRUPO_ELIMINAR", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_cod", MySqlDbType.Int32).Value = grupo.idGrupo;
                cmd.ExecuteNonQuery();
                con.Close();
                resultado = "eliminado";
                Console.WriteLine("DELETE ITEMGRUPO OK");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error: " + ex.ToString();
                return resultado;
            }
        }

        public string editarItemGrupo(EntItemGrupoDet grupo)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_GRUPO_EDITAR", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_cod", MySqlDbType.Int32).Value = grupo.grupo.idGrupo;
                cmd.Parameters.Add("_nombre", MySqlDbType.VarChar).Value = grupo.grupo.nombre;
                cmd.Parameters.Add("_codPro", MySqlDbType.VarChar).Value = grupo.idSolicitud;
                cmd.Parameters.Add("_tipo", MySqlDbType.VarChar).Value = grupo.grupo.tipo;
                cmd.Parameters.Add("_resultado", MySqlDbType.VarChar).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                resultado = cmd.Parameters["_resultado"].Value.ToString();
                con.Close();
                Console.WriteLine("EDIT ITEMGRUPO OK");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error: " + ex.ToString();
                return resultado;
            }
        }

        public string deleteGrupoDet(EntItemGrupoDet grupo)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_GRUPO_SOL_ELIMINAR", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_codGrupo", MySqlDbType.Int32).Value = grupo.grupo.idGrupo;
                cmd.Parameters.Add("_codSolicitud", MySqlDbType.VarChar).Value = grupo.idSolicitud;
                cmd.ExecuteNonQuery();
                con.Close();
                resultado = "exito";
                Console.WriteLine("EDIT ITEMGRUPO OK");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error: " + ex.ToString();
                return resultado;
            }
        }

        public string associateGrupo(EntItemGrupoDet grupo)
        {
            string resultado = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand("SP_GRUPO_ASOCIAR", con.Open());
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("_codGrupo", MySqlDbType.Int32).Value = grupo.grupo.idGrupo;
                cmd.Parameters.Add("_requisito", MySqlDbType.Int32).Value = Convert.ToInt32((grupo.idSolicitud));
                cmd.Parameters.Add("_resultado", MySqlDbType.VarChar).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                resultado = cmd.Parameters["_resultado"].Value.ToString();
                con.Close();
                Console.WriteLine("Asociado ITEMGRUPO OK");
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                resultado = "error: " + ex.ToString();
               return resultado;
            }
        }

    }
}
