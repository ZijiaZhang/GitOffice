import PDFTeX from 'PDFTeX'
export class TexLive{
    constructor() {
        this.aux = null;
        this.toc = null;
    }

    render(source, dest){
        var pdftex = new PDFTeX('/js/texlive.js/pdftex-worker.js');
        pdftex.set_TOTAL_MEMORY(80*1024*1024).then(() => {
            console.log("compiling")
            pdftex.compile(source, this.aux, this.toc).then((pdf, aux, toc) => {
                let pdf_dataurl = pdf;
                this.aux = aux;
                this.toc = toc;
                this.showPDF(dest, pdf_dataurl);
            });
        });

    }

    showPDF(dest, pdf_dataurl) {
        dest.innerHTML = `<iframe class="pdfViewer" src=${pdf_dataurl} height="200" width="300"></iframe>`
    }
}