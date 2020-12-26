import React from "react"
import {FileExplorer} from "./FileExplorer";

export class Editor extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
    }
    render(){
        return (<div className="editorWrapper">
            <FileExplorer user={this.props.match.params.owner} repo={this.props.match.params.repo}/>
        </div>)
    }
}
