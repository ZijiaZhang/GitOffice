import PDFTeX from 'PDFTeX'
export class TexLive{
    constructor() {
    }

    render(source, dest){
        console.log("Rendering\n" + source);

        var pdftex = new PDFTeX('/js/texlive.js/pdftex-worker.js');
        pdftex.set_TOTAL_MEMORY(80*1024*1024).then(() => {

            var start_time = new Date().getTime();

            pdftex.compile(source).then((pdf_dataurl) => {
                var end_time = new Date().getTime();
                console.info("Execution time: " + (end_time-start_time)/1000+' sec');
                this.showPDF(dest, pdf_dataurl);
            });
        });

    }

    showPDF(dest, pdf_dataurl) {
        dest.innerHTML = `<iframe class="pdfViewer" src=${pdf_dataurl} height="200" width="300"></iframe>`
    }
}