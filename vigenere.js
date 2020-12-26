const asciiAlphabetStart = 65;
const asciiAlphabetEnd = 90;
const alphabetSize = 26;
const messageToASCII = (msg) => {

    const result = [];
    for(let i = 0; i < msg.length; ++i) {
        const letterAsciiCode = msg[i].toUpperCase().charCodeAt(0);
        if(letterAsciiCode >= asciiAlphabetStart && letterAsciiCode <= asciiAlphabetEnd ) {
            result.push(letterAsciiCode)
        }
    }
    return result;
};
const messageToAlphabetNumbers = (msg) => {
    const result = [];
    for(let i = 0; i < msg.length; ++i) {
        const letterNumber = msg[i].toUpperCase().charCodeAt(0) - asciiAlphabetStart;
        if(letterNumber >= 0 && letterNumber < alphabetSize ) {
            result.push(letterNumber)
        }
    }
    return result;
};
const alphabetNumbersToMessage = (arr) => {
    return String.fromCharCode(...arr.map(n => n+asciiAlphabetStart))
};

const encrypt = (plaintext, plainkey) => {
    const msg = messageToAlphabetNumbers(plaintext);
    const key = messageToAlphabetNumbers(plainkey);
    const encryptedNumbers = [];
    for(let i = 0; i < msg.length; ++i) {
        const encryptedLetter = ((msg[i] + key[i % key.length]))%26;
        encryptedNumbers.push(encryptedLetter);
    }
    const result = alphabetNumbersToMessage(encryptedNumbers);
    return result;
};

const decrypt = (cyphertext, plainkey) => {
    const encryptedNumbers = messageToAlphabetNumbers(cyphertext);
    const key = messageToAlphabetNumbers(plainkey);
    const decryptedNumbers = [];
    for(let i = 0; i < encryptedNumbers.length; i++) {
        const decryptedLetter = Math.abs(encryptedNumbers[i] - key[i % key.length] + 26)%26;
        decryptedNumbers.push(decryptedLetter);
    }
    const result = alphabetNumbersToMessage(decryptedNumbers);
    return result;
};

const encryptedMessage = encrypt('meet at midnight', 'secret');
const decryptedMessage = decrypt('EIGKEMEMFEMZZX', 'secret');
console.log(encryptedMessage, decryptedMessage);
