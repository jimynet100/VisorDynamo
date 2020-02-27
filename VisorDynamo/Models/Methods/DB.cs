using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.Configuration;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace VisorDynamo.Models.Methods
{
    public class DB
    {
        MySqlConnection con;

        public DB()
        {
            try
            {
                var configuration = GetConfiguration();
                con = new MySqlConnection(configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
        public IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

        public MySqlConnection Open()
        {
            try
            {
                var configuration = GetConfiguration();
                con = new MySqlConnection(configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value);
                con.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return con;
        }

        public MySqlConnection Close()
        {
            try
            {
                var configuration = GetConfiguration();
                con = new MySqlConnection(configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value);
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return con;
        }
    }
}
