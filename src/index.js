const expresion = document.getElementById('expresion');

const codigoMorse = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.'
};


const pasarAMorse = (texto) => {
    let resultado = '';
    texto = texto.toUpperCase();

    for(let i = 0; i < texto.length; i++){
        if(texto[i] === ' '){
            resultado += '/ ';
        }else if(codigoMorse[texto[i]]){
            resultado += codigoMorse[texto[i]] + ' ';
        }
    }

    return resultado.trim();
};

const pasarATexto = (morse) => {
    let resultado = '';
    let caracteres = morse.split(' ');
    
    for(let i = 0; i < caracteres.length; i++){
        if(caracteres[i] === '/'){
            resultado += ' ';
        }else{
            for(let letra in codigoMorse){
                if(codigoMorse[letra] === caracteres[i]){
                    resultado += letra;
                }
            }
        }
    }

    return resultado;
};