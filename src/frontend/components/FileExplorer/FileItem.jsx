import React from "react"
import {select_file} from '../../actions'
import {connect} from "react-redux";
import {FileExplorer} from "./FileExplorer";
import '../../css/editor.css'

export class FileItem_React extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapse: true
        }
    }

    render() {
        if (this.props.type === 'blob'){
            return (<li onClick={() => this.props.select_file({sha: this.props.sha, path: this.props.parent_path + this.props.path})}>
                {this.props.path}
            </li>)
        } else if (this.props.type === 'tree'){
            return (<li >
                <div onClick={() => this.setState({collapse: !this.state.collapse})}>
                    {this.props.path}
                </div>
                    {this.state.collapse? <div/> : <div style={{display: "flex"}}>
                    <div style={{width: "20px"}}/>
                        <FileExplorer style={this.state.collapse ? {display: "none"}: {}} user={this.props.user} repo={this.props.repo} sha={this.props.sha} path={this.props.parent_path + this.props.path + '/'}/>
                </div>}

            </li>
            )
        }
        else {
            return <li>Error</li>
        }
    }
}

const mapStateToProps = (state) => {
    return {}
};

export const FileItem = connect(mapStateToProps, {select_file: select_file})(FileItem_React);
