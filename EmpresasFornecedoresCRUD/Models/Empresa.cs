using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmpresasFornecedoresCRUD.Models
{
    public class Empresa
    {
        public int Id { get; set; }

        public string Cnpj { get; set; }
        public string Nome_Fantasia { get; set; }

        public string Cep { get; set; }

        public string Estado { get; set; }

        [JsonIgnore]
        public ICollection<int>? ListaDeFornecedores { get; set; }



    }
}
