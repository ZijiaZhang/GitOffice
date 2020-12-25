import React from "react";

export class FileEditor extends React.Component {
    constructor(props) {
        super(props);
        if (this.constructor === FileEditor) {
            throw new TypeError("This is an abstract class");
        }
    }

    save(){};
    load(data){};
}
