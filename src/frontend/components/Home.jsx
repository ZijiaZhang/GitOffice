import React from "react"
import css from "../css/home.css";
import {Link} from "react-router-dom";

export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            repos: []
        }
    }

    render(){
        return (<div>
            <h2>You have Logged in {this.state.user? this.state.user.username: "Loading"}</h2>
            <h3>Your repos:</h3>
            <div id="item-list">
            <ul>
                {this.state.repos.map((repo) =>

                    <li key={`${repo.owner.login}/${repo.name}`}>
                        <Link to={`/${repo.owner.login}/${repo.name}`}>
                        <h2>{`${repo.owner.login}/${repo.name}`}</h2>
                            <span>{repo.private? "Private": "Public"}</span></Link>
                    </li>)}
            </ul>
            </div>
        </div>)
    }

    componentDidMount() {
        this.getUser();
        this.getRepos();
    }

    async getUser(){
        let user = await (await fetch('/api/v1/github/user')).json();
        this.setState({user})
    }

    async getRepos(){
        let repos = await (await fetch('/api/v1/github/repos')).json()
        this.setState({repos})
    }

}