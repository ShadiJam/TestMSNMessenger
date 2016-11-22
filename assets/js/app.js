// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import * as BLUE from '@blueprintjs/core'

console.log(BLUE);

// Utility methods
// --------------
const log = (...a) => console.log(...a)

const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => r.json())
    .catch(e => log(e))

const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())

const remove = (url, data) =>
    fetch(url, { 
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .delete(data)

const edit = (url, data) =>
    fetch(url, { 
        method: 'PUT',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .return(r => r.json())
// ----------------

const Error = () => <div>Page Not Found</div>

const Chatroom = (chatroom) => 
    <a className="chatlink" href={`#/status/${chatroom.id}`}>
        <h1>{chatroom.title}</h1>
    </a>

class Login extends Component {
    constructor(props){
        super(props)
        this.props.email = {Email}
        this.props.password = {Password}
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('api/account/login', {
            Email: this.refs.email.value,
            Password: this.refs.password.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err 
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        } 
        return <div>
            <form id="login-form" action="api/account/login" method="Login" onSubmit={this.onSubmit}>

            <div asp-validation-summary="All"></div>

             <p>Please Log In</p>   

        <div>
            <input ref="Email" type="email" placeholder="user@email.com" required/>
            <input ref="Password" type="password" placeholder="Your Password"/>
        </div>
        <div>
        <a href='/UserHome'>
            <button type="submit">Log In</button>
        </a>
        </div>
        </form>

        <form id="register-form" action="api/account/register" method="Register" onSubmit={this.onSubmit}>
        <div asp-validation-summary="All"></div>
        <p> Or Create an account: </p>
        <div>
            <input ref="Email" type="email" placeholder="user@email.com" required/>
            <input ref="Password" type="password" placeholder="Your Password"/>
        </div>
        <div>
        <a href='/NewUser'>
            <button type="submit">Register</button>
        </a>
        </div>
        </form> 
        </div>
     
    }
}

const Layout = ({children}) =>
    <div>
        <div>
            <div><Nav/></div>
            <div><Breadcrumbs/></div>
            <div><Table/></div>
        </div>
        <hr/>
        <div>
        {children}
        </div>
    </div>
 
const Nav = () =>     
    <nav className="pt-navbar pt-dark pt-fixed-top">
        <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Blueprint</div>
            <input className="pt-input" placeholder="Search files..." type="text" />
        </div>
        <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home">Home</button>
            <button className="pt-button pt-minimal pt-icon-document">Files</button>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-user"></button>
            <button className="pt-button pt-minimal pt-icon-notifications"></button>
            <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
    </nav>

const Breadcrumbs = () =>
    <ul className="pt-breadcrumbs">
        {["Home", "About", "Story"].map(x => 
            <li><BLUE.Breadcrumb text={x} /></li>
        )}
    </ul>



const Table = () => 
    <table className="pt-table pt-interactive pt-bordered">
        <thead>
            <th>Project</th>
            <th>Description</th>
            <th>Technologies</th>
        </thead>
        <tbody>
            <tr>
            <td>Blueprint</td>
            <td>CSS framework and UI toolkit</td>
            <td>Sass, TypeScript, React</td>
            </tr>
            <tr>
            <td>TSLint</td>
            <td>Static analysis linter for TypeScript</td>
            <td>TypeScript</td>
            </tr>
            <tr>
            <td>Plottable</td>
            <td>Composable charting library built on top of D3</td>
            <td>SVG, TypeScript, D3</td>
            </tr>
        </tbody>
    </table>

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('/api/chatroom').then(chatrooms => {
            chatrooms = chatrooms.reverse()
            this.setState({items: chatrooms})
        }).catch(e => log(e))
    }
    render(){
        return <div className="login-button">
                <a href='#/login'>
                    <button type="login">Login or Register</button>
                </a>
            </div>
    }
}
class NewUser extends Component {
    constructor(props){
        super(props)
        this.props.loggedOn = {userAuthenticated}
        this.props.name = {userName}
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('/api/account/register').then(chatrooms => {
            chatrooms = chatrooms.reverse()
            this.setState({items: chatrooms})
        }).catch(e => log(e))
    }
    render(){
        return <div className="new-chatroom">
            <a href="/createChat">
                <button>Create a New Chatroom</button>
            </a>
        </div>
    }
}
class UserHome extends Component {
    constructor(props){
        super(props)
        this.props.loggedOn = {userAuthenticated}
        this.props.name = {userName}
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('/api/chatroom').then(chatrooms => {
            chatrooms = chatrooms.reverse()
            this.setState({items: chatrooms})
        }).catch(e => log(e))
    }
    render(){
        return <div className="grid grid-3-600">
            {this.state.items.map(Chatroom)}
        </div>
    }
}

const reactApp = () => 
    render(
        <Layout>
            <Router history={hashHistory}>
                <Route path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/api/account/register" component={NewUser}/>
                <Route path="api/account/login" component={UserHome}/>
                <Route path="*" component={Error}/>
            </Router>
        </Layout>,
    document.querySelector('.app'))

reactApp()

// Flow types supported (for pseudo type-checking at runtime)
// function sum(a: number, b: number): number {
//     return a+b;
// }
//
// and runtime error checking is built-in
// sum(1, '2');