using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using EmpresasFornecedoresCRUD.Models;

namespace EmpresasFornecedoresCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmpresaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
    select Id, CNPJ, Nome_Fantasia, Cep, Estado from empresa
    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCon.Open();
                SqlDataReader myReader = myCommand.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }

            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in table.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }

            return new JsonResult(rows);
        }


        [HttpPost]
        public IActionResult Post(Empresa emp)
        {
            string query = @"
        insert into Empresa values
        (@Cnpj, @Nome_Fantasia, @Cep, @Estado)
    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@Cnpj", emp.Cnpj);
                myCommand.Parameters.AddWithValue("@Nome_Fantasia", emp.Nome_Fantasia);
                myCommand.Parameters.AddWithValue("@Cep", emp.Cep);
                myCommand.Parameters.AddWithValue("@Estado", emp.Estado);
                myCon.Open();
                myCommand.ExecuteNonQuery();
            }

            return Ok("Insert executado com êxito!");
        }

        [HttpPut]
        public IActionResult Put(Empresa emp)
        {
            string query = @"
    update Empresa set CNPJ = @Cnpj, Nome_Fantasia = @Nome_Fantasia, Cep = @Cep, Estado = @Estado where Id = @Id
    ";
            DataTable dataTable = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@Id", emp.Id);
                myCommand.Parameters.AddWithValue("@Cnpj", emp.Cnpj);
                myCommand.Parameters.AddWithValue("@Nome_Fantasia", emp.Nome_Fantasia);
                myCommand.Parameters.AddWithValue("@Cep", emp.Cep);
                myCommand.Parameters.AddWithValue("@Estado", emp.Estado);
                myCon.Open();
                myCommand.ExecuteNonQuery();
            }

            return Ok("Update executado com êxito!");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = @"
    delete from Empresa where Id = @Id
    ";
            string sqlDataSource = _configuration.GetConnectionString("Default");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@Id", id);
                myCon.Open();
                myCommand.ExecuteNonQuery();
            }

            return Ok("Delete executado com êxito!");
        }


    }
}

