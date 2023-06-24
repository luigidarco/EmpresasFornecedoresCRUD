import { tsConstructorType } from "@babel/types";
import { react, Component } from 'react';
import { variaveis } from './Variaveis.js';

export class Empresa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            empresas: [],
            loading: true,
            modalTitle: "",
            Id: "",
            CNPJ: "",
            Nome_Fantasia: "",
            Cep: "",
            Estado: ""

        }
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

    changeCNPJ = (event) => {
        this.setState({ CNPJ: event.target.value });
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

    render() {
        const { empresas, modalTitle, Id, CNPJ, Nome_Fantasia, Cep, Estado } = this.state;
        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>Adicionar Empresa</button>
                <table className='table table-striped' aria-labelledby="tabelLabel">
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
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(emp)}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1">
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
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.closeModal}></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">CNPJ</span>
                                    <input type="text" className="form-control" value={CNPJ} onChange={this.changeCNPJ} />
                                </div>

                                {Id === 0 ? <button type="button" className="btn btn-primary float-start" onClick={this.createClick}>Criar</button> : null}

                                {Id !== 0 ? <button type="button" className="btn btn-primary float-start" onClick={this.updateClick}>Atualizar</button> : null}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}