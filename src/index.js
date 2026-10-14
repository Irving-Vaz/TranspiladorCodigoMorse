import Swal from "sweetalert2";
const textoMorse = document.getElementById('textoMorse');
const morseTexto = document.getElementById('morseTexto');
const etiquetaEntrada = document.getElementById('etiquetaEntrada');
const entrada = document.getElementById('entrada');
const convertir = document.getElementById('convertir');
const barredora = document.getElementById('barredora');
const resultado = document.getElementById('resultado');

let tipoConversion = 'texto';

const validarTexto = /^[a-zA-Z0-9 ]+$/;
const validarMorse = /^[.\-/ ]+$/;

const codigoMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..',
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
        }else{
            return '';
        }
    }

    return resultado.trim();
};

const pasarATexto = (morse) => {
    let resultado = '';
    let caracteres = morse.split(' ');

    for(let i = 0; i < caracteres.length; i++){
        if(caracteres[i] === ''){
            continue;
        }

        if(caracteres[i] === '/'){
            resultado += ' ';
        }else{
            let encontrado = false;

            for(let letra in codigoMorse){
                if(codigoMorse[letra] === caracteres[i]){
                    resultado += letra;
                    encontrado = true;
                }
            }

            if(!encontrado){
                return '';
            }
        }
    }

    return resultado;
};

textoMorse.addEventListener('click', () => {
    tipoConversion = 'texto';
    etiquetaEntrada.textContent = 'Ingresa el texto';
    entrada.placeholder = 'Escribe el texto que deseas convertir a Morse...';

    textoMorse.className = 'btn btn-info w-50';
    morseTexto.className = 'btn btn-outline-light w-50';
});

morseTexto.addEventListener('click', () => {
    tipoConversion = 'morse';
    etiquetaEntrada.textContent = 'Ingresa el código Morse';
    entrada.placeholder = 'Separa las letras con espacios y las palabras con /...';

    morseTexto.className = 'btn btn-info w-50';
    textoMorse.className = 'btn btn-outline-light w-50';
});

convertir.addEventListener('click', () => {
    let texto = entrada.value;

    if(texto.trim() === ''){
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Ingresa el contenido que deseas convertir.'
        });
        return;
    }

    if(tipoConversion === 'texto'){
        if(!validarTexto.test(texto)){
            Swal.fire({
                icon: 'error',
                title: 'Texto inválido',
                text: 'Utiliza únicamente letras sin acentos, números y espacios.'
            });
            return;
        }

        resultado.value = pasarAMorse(texto);

    }else{
        if(!validarMorse.test(texto) || texto.trim().split(/\s+/).length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Código inválido',
                text: 'Utiliza únicamente puntos, rayas y separadores válidos.'
            });
            return;
        }

        resultado.value = pasarATexto(texto.trim().replace(/\s+/g, ' '));

        if(resultado.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Código Morse incorrecto',
                text: 'El código ingresado está incompleto o contiene secuencias desconocidas.'
            });
            return;
        }
    }
});

barredora.addEventListener('click', () => {
    entrada.value = '';
    resultado.value = '';
});