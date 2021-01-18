import React from "react"
import {FileItem} from "./FileItem";
import {connect} from "react-redux";

import css from "../../css/fileExplorer.css";
import {update_repo_info} from "../../actions";


class FileExplorer_React extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            repoInfo: null,
            branchInfo: null,
            treeInfo: null,
            error: null
        }
        this.getInfo(this.props.user, this.props.repo, this.props.sha);
    }
    render() {
        if (this.state.error){
            return (<div>
                {JSON.stringify(this.state.error)}
            </div>)
        }
        if (this.state.treeInfo){
            return (
                <div className="item-list" >
                <ul>
                {this.state.treeInfo.tree.map((file)=>
                    <FileItem {...this.props} key={file.sha} sha={file.sha} path={file.path} type={file.type} parent_path={this.props.path}/>)}
                </ul>
                </div>)
        }
        return (
            <div>
                Loading ...
            </div>
        );
    }

    async getInfo(user, repo, sha) {
        try {
            if (!sha){
                let repoInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}`)).json()
                this.setState({repoInfo})
                this.props.update_repo_info(repoInfo)
                let branchInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}/${repoInfo.default_branch}`)).json()
                this.setState({branchInfo})
                sha = branchInfo.commit.commit.tree.sha
            }
            console.log(sha);
            let treeInfo = await (await fetch(`/api/v1/github/repo/${user}/${repo}/tree/${sha}`)).json()
            this.setState({treeInfo})
        } catch (e){
            this.setState({error: e})
        }
    }

}

const mapStateToProps = (state) => {
    return {selected_file: state.selected_file}
};

export const FileExplorer = connect(mapStateToProps, {update_repo_info: update_repo_info})(FileExplorer_React);
