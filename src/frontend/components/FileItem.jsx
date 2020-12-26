import React from "react"
import {select_file} from '../actions'
import {connect} from "react-redux";

export class FileItem_React extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<li>
            <button onClick={() => this.props.select_file(this.props.sha)}>{this.props.path}</button>
        </li>)
    }
}

const mapStateToProps = (state) => {
    return {}
};

export const FileItem = connect(mapStateToProps, {select_file: select_file})(FileItem_React);
