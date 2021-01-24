import {FileEditor} from "./FileEditor";
import React from  "react"
import { parse, HtmlGenerator } from 'latex.js'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/stex/stex');
import {connect} from "react-redux";

import "../../../css/CodeMirror.css";
import {TexLive} from "../../LatexCompiler/TexLive";

class LatexEditorTexLive_React extends FileEditor{

    constructor(props) {
        super(props);
        this.current_file = props.selected_file;
        console.log(this.current_file);
        this.state = {value: ""}
        this.displayArea = React.createRef()
        this.texLive = new TexLive()
        this.savedData = ''
        window.onbeforeunload = () => {
            if (this.savedData !== this.state.value) {
                return 'There are unsaved changes. Are you sure you want to leave?';
            }
        }
    }

    render() {
        return (<div className="fileEditorWrapper"><button onClick={() => this.save()}> Save</button>
            <div style={{display: "flex", width: "100%"}}>
                <CodeMirror value={this.state.value} options={{mode:"stex",lineWrapping: true,
                    lineNumbers: true}} onBeforeChange={(editor, data, value) => {
                    this.setState({value});

                }}
                            onChange={(editor, data,v) => this.compileLatex(v)}/>
                <div className="latex-render" ref={this.displayArea}/>
            </div></div>
        )
    }

    async save(){
        if(this.props.repo_info) {
            let data = await (await fetch(`/api/v1/github/repo/${this.props.user}/${this.props.repo}/${this.props.repo_info.default_branch}/${this.props.selected_file.path}`, {
                body: JSON.stringify({
                    content: btoa(this.state.value),
                    message: "Edit on GitOffice",
                    sha: this.props.selected_file.sha
                }), headers: {'Content-Type': 'application/json'},mode: 'cors', method: "POST"
            })).json();
            console.log(data);
            this.savedData = this.state.value;
        } else {
            window.alert("No repo Specified");
        }

    }
    load(data) {
        this.setState({value: data});
    }

    compileLatex(v) {
        this.texLive.render(this.state.value, this.displayArea.current)
        return v
    }

    componentDidMount() {
        this.load_file_via_path(this.props.selected_file.path)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selected_file.path !== prevProps.selected_file.path) {

            this.load_file_via_path(this.props.selected_file.path);
        }
    }

    // async load_file(file_sha) {
    //     if(!file_sha)
    //         return;
    //     let file_content = await (await fetch(`/api/v1/github/repo/${this.props.user}/${this.props.repo}/blob/${file_sha}`)).text()
    //     this.setState({value: file_content});
    // }

    async load_file_via_path(file_path) {
        if(!file_path)
            return;
        let file_content = await (await fetch(`/api/v1/github/repo/${this.props.user}/${this.props.repo}/contents/${file_path}`)).text()
        this.setState({value: file_content});
    }
}

const mapStateToProps = (state) => {
    return {repo_info: state.repo_info, selected_file: state.selected_file}
};

export const LatexEditorTexLive = connect(mapStateToProps, {})(LatexEditorTexLive_React);
