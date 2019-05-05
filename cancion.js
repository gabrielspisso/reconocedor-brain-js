module.exports = class Cancion{

    constructor(titulo, letra){
        this.titulo=titulo;
        this.letra=letra;
    }

    encode(arg) {
        return arg.split('').map(x => (x.charCodeAt(0) / 256));
    }

    letraAsUnicode(){
        return encode(this.letra);
    }

    tituloAsUnicode(){
        return encode(this.titulo);
    }

    
}