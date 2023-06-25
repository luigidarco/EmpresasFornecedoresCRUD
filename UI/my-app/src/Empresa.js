import { tsConstructorType } from "@babel/types";
import { react, Component } from 'react';
import { variaveis } from './Variaveis.js';

export class Empresa extends Component {

    constructor(props) {

        super(props);

        this.state = {
            empresas: [],
            modalTitle: '',
            Id: 0,
            CNPJ: "",
            Nome_Fantasia: "",
            Cep: "",
            Estado: "",
            fornecedores: [],

        }

        this.estados = [
            'Acre',
            'Alagoas',
            'Amapá',
            'Amazonas',
            'Bahia',
            'Ceará',
            'Distrito Federal',
            'Espírito Santo',
            'Goiás',
            'Maranhão',
            'Mato Grosso',
            'Mato Grosso do Sul',
            'Minas Gerais',
            'Pará',
            'Paraíba',
            'Paraná',
            'Pernambuco',
            'Piauí',
            'Rio de Janeiro',
            'Rio Grande do Norte',
            'Rio Grande do Sul',
            'Rondônia',
            'Roraima',
            'Santa Catarina',
            'São Paulo',
            'Sergipe',
            'Tocantins'
        ];
    }

    refreshList() {
        console.log(variaveis.API_URL + 'Empresa');
        fetch(variaveis.API_URL + 'Empresa')
            .then(response => response.json())
            .then(data => {
                this.setState({ empresas: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeCNPJ = (e) => {
        this.setState({ CNPJ: e.target.value });
    }

    changeNome_Fantasia = (e) => {
        this.setState({ Nome_Fantasia: e.target.value });
    }

    changeCEP = (e) => {
        this.setState({ Cep: e.target.value });
    }

    changeEstado = (e) => {
        this.setState({ Estado: e.target.value });
    }


    getFornecedores = (id_empresa) => {
        fetch(variaveis.API_URL + `Empresa/${id_empresa}/fornecedores`)
            .then(response => response.json())
            .then(data => {
                this.setState({ fornecedores: data });
            })
            .catch(error => {
                console.log('Falha ao obter os fornecedores', error);
            });
    }

    addClick() {
        this.setState({
            modalTitle: "Adicionar Empresa",
            Id: 0,
            CNPJ: "",
            Nome_Fantasia: "",
            Cep: "",
            Estado: ""
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Editar Empresa",
            Id: emp.Id,
            CNPJ: emp.CNPJ,
            Nome_Fantasia: emp.Nome_Fantasia,
            Cep: emp.Cep,
            Estado: emp.Estado
        });
    }

    seeClick(emp) {
        this.setState({ modalTitle: "Visualizar Fornecedores" });
        this.getFornecedores(emp.Id);
    }

    createClick() {
        fetch(variaveis.API_URL + 'Empresa', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                CNPJ: this.state.CNPJ,
                Nome_Fantasia: this.state.Nome_Fantasia,
                Cep: this.state.Cep,
                Estado: this.state.Estado
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            })
            .catch((error) => {

                alert('Falha ao adicionar empresa');
            })
    }

    updateClick() {
        fetch(variaveis.API_URL + 'Empresa', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                Id: this.state.Id,
                CNPJ: this.state.CNPJ,
                Nome_Fantasia: this.state.Nome_Fantasia,
                Cep: this.state.Cep,
                Estado: this.state.Estado
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            })
            .catch((error) => {

                alert('Falha ao atualizar a empresa');
            })
    }

    deleteClick(Id) {
        if (window.confirm('Tem certeza que deseja deletar a empresa?')) {
            fetch(variaveis.API_URL + 'Empresa/' + Id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },


            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                })
                .catch((error) => {

                    alert('Falha ao atualizar a empresa');
                })
        }
    }

    render() {
        const {
            empresas,
            fornecedores,
            modalTitle,
            Id,
            CNPJ,
            Nome_Fantasia,
            Cep,
            Estado
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>Adicionar Empresa</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>CNPJ</th>
                            <th>Nome Fantasia</th>
                            <th>Cep</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map(emp =>
                            <tr key={emp.Id}>
                                <td>{emp.Id}</td>
                                <td>{emp.CNPJ}</td>
                                <td>{emp.Nome_Fantasia}</td>
                                <td>{emp.Cep}</td>
                                <td>{emp.Estado}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.seeClick(emp)}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(emp)}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(emp.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>


                            {modalTitle === "Visualizar Fornecedores" && (
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>CNPJ/CPF</th>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>CEP</th>
                                                <th>Data de Nascimento</th>
                                                <th>RG</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fornecedores.map(fornecedor => (
                                                <tr key={fornecedor.Id}>
                                                    <td>{fornecedor.Id}</td>
                                                    <td>{fornecedor.Cnpj_Cpf}</td>
                                                    <td>{fornecedor.Nome}</td>
                                                    <td>{fornecedor.Email}</td>
                                                    <td>{fornecedor.Cep}</td>
                                                    <td>{fornecedor.Data_nascimento}</td>
                                                    <td>{fornecedor.RG}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {(modalTitle === "Adicionar Empresa" || modalTitle === "Editar Empresa") && (
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">CNPJ</span>
                                        <input type="text" className="form-control" value={CNPJ} onChange={this.changeCNPJ} />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nome Fantasia</span>
                                        <input type="text" className="form-control" value={Nome_Fantasia} onChange={this.changeNome_Fantasia} />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">CEP</span>
                                        <input type="text" className="form-control" value={Cep} onChange={this.changeCEP} />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Estado</span>
                                        <select className="form-control" value={Estado} onChange={this.changeEstado}>
                                            <option value="">Selecione</option>
                                            {this.estados.map((estado, index) => (
                                                <option key={index} value={estado}>{estado}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {Id === 0 && modalTitle === "Adicionar Empresa" ? (
                                        <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Criar</button>
                                    ) : null}
                                    {Id !== 0 && modalTitle === "Editar Empresa" ? (
                                        <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Atualizar</button>
                                    ) : null}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div >
        );
    }
}