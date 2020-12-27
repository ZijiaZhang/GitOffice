import React from "react"
import "../css/navbar.scoped.css"

export class NavigateBar extends React.Component {
    render() {
        return (<div>
            <ul>
                <li onClick={() => this.props.history.push('/')}>
                    Home
                </li>
                <li onClick={() => window.location.href = '/logout'}>
                    Logout
                </li>
            </ul>
        </div>)
    }
}

