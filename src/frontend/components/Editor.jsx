import React from "react"
import {FileExplorer} from "./FileExplorer";
import {LatexEditor} from "./FileEditor/LatexEditor";
import {connect} from "react-redux";

import css from '../css/editor.css'

class Editor_React extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
    }
    render(){
        return (<div className="editorWrapper">
            <div className="explorerWrapper">
                <FileExplorer user={this.props.match.params.owner} repo={this.props.match.params.repo}/>
            </div>
            <LatexEditor selected_file={this.props.selected_file} user={this.props.match.params.owner} repo={this.props.match.params.repo}/>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {selected_file: state.selected_file}
};

export const Editor = connect(mapStateToProps, {})(Editor_React);
