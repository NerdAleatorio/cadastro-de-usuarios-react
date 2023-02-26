import React from "react";
import Main from '../template/Main'
import './Home.css'

export default props => 
    <Main icon="home" title="Início" subtitle="Sobre o projeto.">
        <div className="display-4">Bem vindo!</div><hr/>
        <p className="mb-5">Este sistema foi feito para exemplificar a construção de um cadastro.<br></br>O desenvolvimento foi feito através de React.JS e como servidor o JSON server.</p>
        <p className="mb-0">Acesse o repositório do projeto através deste <a href="https://github.com/NerdAleatorio/cadastro-de-usuarios-react">link</a>.</p>
        <a href="https://deviansantos.tech" className="return"><button>Retornar ao site</button></a>
    </Main>
