import {FileEditor} from "./FileEditor";
import React from "react";
import Quill from "quill";
import html2pdf from "html2pdf.js";

export class RichTextEditor extends FileEditor{

    constructor(props) {
        super(props);
        this.editor = null;
        this.Delta = Quill.import('delta')
        this.change = new this.Delta();
    }

    render(){
        return (<div id="editor-container" onLoad={() => this.initQuill()}>
            <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet"/>

        <div id="toolbar">
                <button className="ql-bold">Bold</button>
                <button className="ql-italic">Italic</button>
                <button className="ql-save" onClick={() => this.save()}>Save</button>
                <button className="ql-export" onClick={() => this.export()}>Export</button>

        </div>
            <div id="editor">
                <p>Hello</p>
            </div>
        </div>)
    }

    initQuill() {
        this.editor = new Quill('#editor', {
            modules: {toolbar: '#toolbar'},
            theme: 'snow'
        });

        this.editor.on('text-change', (delta) => this.change = this.change.compose(delta)
)
        window.onbeforeunload = () => {
            if (this.change.length() > 0) {
                return 'There are unsaved changes. Are you sure you want to leave?';
            }
        }
    }

    save(){
        if (this.editor) {
            let text = this.editor.getContents()
            this.change = new this.Delta()
            // To Do push to Github/somewhere else
            return text;
        }
        return null;
    }

    load(data){
        return data;
    }

    export(){
        const element = document.getElementById('editor');
        html2pdf(element).save();
    }

}