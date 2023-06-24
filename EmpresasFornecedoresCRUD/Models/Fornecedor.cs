namespace EmpresasFornecedoresCRUD.Models
{
    public class Fornecedor
    {
        // Create methoods for Id, Cnpj_Cpf, Nome, Email, Cep, Data_nascimento
        public int Id { get; set; }
        public string Cnpj_Cpf { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Cep { get; set; }
        public string Data_nascimento { get; set; }
    }
}
