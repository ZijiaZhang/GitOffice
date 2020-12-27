import {FileEditor} from "./FileEditor";
import React from  "react"
import { parse, HtmlGenerator } from 'latex.js'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/stex/stex');
import "../../../css/CodeMirror.css";

export class LatexEditor extends FileEditor{


    constructor(props) {
        super(props);
        this.current_file = props.selected_file;
        this.state = {value: ""}
        this.displayArea = React.createRef()
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

    save(){
        this.savedData = this.state.value;
    }
    load(data) {
        this.setState({value: data});
    }

    compileLatex(v) {
        try {
            let generator = new HtmlGenerator()
            let doc = parse(v, {generator})
            this.displayArea.current.innerHTML = '';
            this.displayArea.current.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))
            this.displayArea.current.appendChild(doc.domFragment())
            return v
        } catch (e) {
            this.displayArea.current.innerHTML = ''
            let elem = document.createElement('p')
            elem.innerHTML = JSON.stringify(e)
            this.displayArea.current.appendChild(elem);
            return v
        }
    }

    componentDidMount() {
        this.load_file(this.props.selected_file)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selected_file !== prevProps.selected_file) {

            this.load_file(this.props.selected_file);
        }
    }

    async load_file(file_sha) {
        if(!file_sha)
            return;
        let file_content = await (await fetch(`/api/v1/github/repo/${this.props.user}/${this.props.repo}/blob/${file_sha}`)).text()
        this.setState({value: file_content});
    }

}