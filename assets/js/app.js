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


const Message = (message) =>
    <a className="message" href={`#/status/${message.id}`}>
            <p>{message.text}</p>
            <span>{message.handle}</span>
            <button className="editMessage">Edit Message</button>
            <button className="deleteMessage">Delete Message</button>
    </a>
    
class Chatroom extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get('/api/chatroom'+this.state.id).then(x => {
            messages = messages.reverse()
            this.setState({items: messages})
        }).catch(e => log(e))
    }
    render() {
        return <div className="grid grid-3-600">
            <div>
                {this.state.items.map(Message)}
                <a href="#/EditMessage" className="edit-button"/>
                <a href="#/DeleteMessage" className="delete-button"/>
            </div>
            <a href="#/AddMessage" className="add-button"/>
        </div>
    }
}


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

const ChatCard = ({title="IM DA BOSS", url="api/chatroom/${chatroom.id}"}) => 
    <div className="pt-card pt-elevation-1 pt-interactive">
        <h5><a href={url}>{title}</a></h5>
    </div>

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

const Home = () => 
    <div>
        <Nav />
        <Breadcrumbs />
        <hr />
        <div className="grid grid-3-600">
            {[
                {title: "TEST TITLE"},
                {title: "TEST TITLE"},
                {title: "TEST TITLE"}
            ].map(x => [<ChatCard {...x} />, " "] )}
        </div>
        <div className="grid">
            <Table />
        </div>
    </div>

const reactApp = () => 
    render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="api/chatroom/:id" component={ChatCard}/>
      
    </Router>,
    document.querySelector('.app'))

reactApp()

// Flow types supported (for pseudo type-checking at runtime)
// function sum(a: number, b: number): number {
//     return a+b;
// }
//
// and runtime error checking is built-in
// sum(1, '2');