

export default class OpcionesCorreo {

    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;

    constructor(data?: any) {
        if (!data) {
            this.from = "cristina.lopezr@udea.edu.co";
            this.to = "";
            this.subject = "";
            this.text = "";
            this.html = "";
        } else {
            this.from = 'cristina.lopezr@udea.edu.co';
            this.to = data.to;
            this.subject = data.subject;
            this.text = data.text;
            this.html = data.html;
        }
    }


}