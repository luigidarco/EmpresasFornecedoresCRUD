using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using EmpresasFornecedoresCRUD.Models;
using System.Runtime.ConstrainedExecution;

namespace EmpresasFornecedoresCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FornecedorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
            select Id, Cnpj_Cpf, Nome, Email, Cep, convert(varchar(10),Data_nascimento,120) as Data_nascimento, RG 
            from Fornecedor
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
        public IActionResult Post(Fornecedor forn)
        {
            string query = @"
        insert into Fornecedor (Cnpj_Cpf, Nome, Email, Cep, Data_nascimento, RG) values
        (@Cnpj_Cpf, @Nome, @Email, @Cep, @Data_nascimento, @RG)
    ";
            
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@Cnpj_Cpf", forn.Cnpj_Cpf);
                myCommand.Parameters.AddWithValue("@Nome", forn.Nome);
                myCommand.Parameters.AddWithValue("@Email", forn.Email);
                myCommand.Parameters.AddWithValue("@Cep", forn.Cep);
                myCommand.Parameters.AddWithValue("@Data_nascimento", forn.Data_nascimento);
                myCommand.Parameters.AddWithValue("@RG", forn.RG);

                myCon.Open();
                myCommand.ExecuteNonQuery();
            }

            return Ok("Insert executado com êxito!");
        }

        [HttpPut]
        public IActionResult Put(Fornecedor forn)
        {
            string query = @"
            update Fornecedor set Cnpj_Cpf = @Cnpj_Cpf, Nome = @Nome, Email = @Email, Data_nascimento= @Data_Nascimento, RG = @RG where Id = @Id
    ";
            
            DataTable dataTable = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@Id", forn.Id);
                myCommand.Parameters.AddWithValue("@Cnpj_Cpf", forn.Cnpj_Cpf);
                myCommand.Parameters.AddWithValue("@Nome", forn.Nome);
                myCommand.Parameters.AddWithValue("@Email", forn.Email);
                myCommand.Parameters.AddWithValue("@Cep", forn.Cep);
                myCommand.Parameters.AddWithValue("@Data_nascimento", forn.Data_nascimento);
                myCommand.Parameters.AddWithValue("@RG", forn.RG);
                myCon.Open();
                myCommand.ExecuteNonQuery();
            }

            return Ok("Update executado com êxito!");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = @"
    delete from Fornecedor where Id = @Id
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
