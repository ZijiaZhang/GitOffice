import React from "react"
import {FileItem} from "./FileItem";
import {connect} from "react-redux";

import css from "../css/home.css";


class FileExplorer_React extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            repoInfo: null,
            branchInfo: null,
            treeInfo: null,
            error: null
        }
    }
    render() {
        if (this.state.error){
            return (<div>
                {JSON.stringify(this.state.error)}
            </div>)
        }
        if (this.state.repoInfo && this.state.branchInfo && this.state.treeInfo){
            return (
                <div id="item-list">
                <p>Selected file {this.props.selected_file}</p>
                <ul>
                {this.state.treeInfo.tree.map((file)=> <FileItem key={file.sha} sha={file.sha} path={file.path} type={file.type}/>)}
            </ul>
                </div>)
        }
        return (
            <div>
                Loading ...
            </div>
        );
    }

    componentDidMount() {
        this.getInfo(this.props.user, this.props.repo);
    }

    async getInfo(user, repo) {
        try {
            let repoInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}`)).json()
            this.setState({repoInfo})
            let branchInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}/${repoInfo.default_branch}`)).json()
            this.setState({branchInfo})
            let treeInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}/tree/${branchInfo.commit.commit.tree.sha}`)).json()
            this.setState({treeInfo})
        } catch (e){
            this.setState({error: e})
        }
    }

}

const mapStateToProps = (state) => {
    return {selected_file: state.selected_file}
};

export const FileExplorer = connect(mapStateToProps, {})(FileExplorer_React);
