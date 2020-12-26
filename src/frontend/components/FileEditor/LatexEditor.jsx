import {FileEditor} from "./FileEditor";
import React from  "react"
import { parse, HtmlGenerator } from 'latex.js'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/stex/stex');
import css from "../../css/CodeMirror.css";

export class LatexEditor extends FileEditor{


    constructor(props) {
        super(props);
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
        return (<div><button onClick={() => this.save()}> Save</button>
            <div style={{display: "flex"}}>
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
        let generator = new HtmlGenerator()
        let doc = parse(v, {generator})
        this.displayArea.current.innerHTML = '';
        this.displayArea.current.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))
        this.displayArea.current.appendChild(doc.domFragment())
        return v
    }
}