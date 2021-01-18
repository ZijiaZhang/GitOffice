import React from "react"
import {FileExplorer} from "../FileExplorer/FileExplorer";
import {LatexEditor} from "./FileEditor/LatexEditor";
import {connect} from "react-redux";

import css from '../../css/editor.css'
import {NavigateBar} from "../NavigateBar";
import {LatexEditorTexLive} from "./FileEditor/LatexEditorTexLive";

class Editor_React extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
    }
    render(){
        return (<div><NavigateBar {... this.props} />
        <div className="editorWrapper">
            <div className="explorerWrapper">
                <FileExplorer user={this.props.match.params.owner} repo={this.props.match.params.repo} path={''}/>
            </div>
            <LatexEditorTexLive selected_file={this.props.selected_file} user={this.props.match.params.owner} repo={this.props.match.params.repo}/>
        </div></div>)
    }
}

const mapStateToProps = (state) => {
    return {selected_file: state.selected_file}
};

export const Editor = connect(mapStateToProps, {})(Editor_React);
