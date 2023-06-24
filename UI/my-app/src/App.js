import logo from './logo.svg';
import './App.css';
import { Inicio } from './Inicio';
import { Empresa } from './Empresa';
import { Fornecedor } from './Fornecedor';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          React FrontEnd
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Inicio">
                Inicio
              </NavLink>
            </li>

            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Empresa">
                Empresa
              </NavLink>
            </li>

            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Fornecedor">
                Fornecedor
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Inicio" Component={Inicio} />
          <Route path="/Empresa" Component={Empresa} />
          <Route path="/Fornecedor" Component={Fornecedor} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
