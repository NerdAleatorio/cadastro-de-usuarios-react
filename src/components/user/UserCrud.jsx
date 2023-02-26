import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import UserCrudCss from "./UserCrud.css"

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastre, edite ou exclua um usuário qualquer.'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: '', date: '', number: ''},
    list: []
}


export default class UserCrud extends Component{

    state = { ...initialState }

    componentWillMount(){
      axios(baseUrl).then(resp => {
        this.setState({ list: resp.data})
      })
    }

    clear(){
        this.setState({ user: initialState.user })
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm(){
        return(
            <div className="form form-div">
                <h1 className="title-form">Cadastrar usuário</h1>
                <p></p>
                <div className="row">
                    <div className="col-12 col-md-6 cadastro-form">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder='Digite o nome'></input>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder='Digite o email'></input>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nascimento</label>
                            <input type="date" className="form-control" name="date" value={this.state.user.date} onChange={e => this.updateField(e)} placeholder='Digite a data'></input>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="number" className="form-control" name="number" value={this.state.user.number} onChange={e => this.updateField(e)} placeholder='Digite o telefone'></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end botoes-form">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Nascimento</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.id} className='açoes'>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.date}</td>
                    <td>{user.number}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() =>this.load(user)}>
                            <i className="fa fa-pencil"></i>    
                        </button>  
                        <button className="btn btn-danger" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>    
                        </button>  
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}