/* 
Crea un programa que sea capaz de transformar texto natural a código morse y viceversa.
a. Debe detectar automáticamente de qué tipo se trata y realizar la conversión.
b. En morse se soporta raya "—", punto ".", un espacio " " entre letras o símbolos y dos
espacios entre palabras " ".
c. El alfabeto morse soportado será el mostrado en
https://es.wikipedia.org/wiki/Código_morse.
*/

const readline = require('readline');

const morseCodeDict = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  _: '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.',
  ' ': '/',
};

function textToMorse(text) {
  let morseCode = '';
  for (let char of text.toUpperCase()) {
    if (morseCodeDict[char]) {
      morseCode += morseCodeDict[char] + ' ';
    } else {
      morseCode = '/ ';
    }
  }

  return morseCode.trim();
}

function morseToText(morseCode) {
  let text = '';
  const morseArray = morseCode.split(' ');
  for (let simbol of morseArray) {
    for (let char in morseCodeDict) {
      if (morseCodeDict[char] === simbol) {
        text += char;
      }
    }
    if (simbol === '/') {
      text += ' ';
    }
  }

  return text;
}

function detectInputType(inputStr) {
  if (/[A-Za-z]/.test(inputStr)) {
    return 'text';
  } else if (inputStr.split('').every((symbol) => morseCodeDict[symbol])) {
    return 'morse';
  } else {
    return 'unknown';
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Ingrese el texto o codigo morse que desea convertir (Escriba exit para salir): ',
  (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    let inputType = detectInputType(userInput);
    if (inputType === 'text') {
      let morseCode = textToMorse(userInput);
      console.log('Texto convertido a codigo morse: ', morseCode);
    } else if (inputType === 'morse') {
      let text = morseToText(userInput);
      console.log('Codigo morse convertido a texto: ', text);
    } else {
      console.log(
        'Entrada no reconocida. Por favor, ingrese texto o codigo morse valido'
      );
    }

    rl.close();
  }
);
