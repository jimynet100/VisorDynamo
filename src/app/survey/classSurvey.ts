export class Survey {
    idProyecto?: number;
    idCorrelativo?: number;
    resText?: string;
    resNumero?: string;

    constructor(idProyecto?: number, idCorrelativo?: number, resText?: string, resNumero?: string) {
        this.idCorrelativo = idProyecto;
        this.idCorrelativo = idCorrelativo;
        this.resText = resText;
        this.resNumero = resNumero;
    }
}
