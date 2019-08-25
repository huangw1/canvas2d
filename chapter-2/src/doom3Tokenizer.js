"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:25
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ETokenType;
(function (ETokenType) {
    ETokenType[ETokenType["NONE"] = 0] = "NONE";
    ETokenType[ETokenType["STRING"] = 1] = "STRING";
    ETokenType[ETokenType["NUMBER"] = 2] = "NUMBER";
})(ETokenType = exports.ETokenType || (exports.ETokenType = {}));
class Doom3Token {
    constructor() {
        this._charArr = [];
        this.reset();
    }
    reset() {
        this._val = 0.0;
        this._charArr = [];
        this._type = ETokenType.NONE;
    }
    get type() {
        return this._type;
    }
    getFloat() {
        return this._val;
    }
    getInt() {
        return parseInt(this._val.toString(), 10);
    }
    getString() {
        return this._charArr.join('');
    }
    isString(str) {
        if (str.length !== this._charArr.length) {
            return false;
        }
        return this._charArr.join('') === str;
    }
    addChar(c) {
        this._charArr.push(c);
    }
    setVal(num) {
        this._val = num;
    }
    setType(type) {
        this._type = type;
    }
}
class Doom3Factory {
    static createDoom3Tokenizer() {
        return new Doom3Tokenizer();
    }
}
exports.Doom3Factory = Doom3Factory;
class Doom3Tokenizer {
    constructor() {
        this._whitespaces = [' ', '\t', '\v', '\n', '\r'];
        this._digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this._current = new Doom3Token();
    }
    _isWhitespace(char) {
        return this._whitespaces.indexOf(char) !== -1;
    }
    _isDigit(char) {
        return this._digits.indexOf(char) !== -1;
    }
    setSource(source) {
        this._source = source;
        this._currIdx = 0;
    }
    reset() {
        this._currIdx = 0;
    }
    get current() {
        return this._current;
    }
    moveNext() {
        return this._getNextToken(this._current);
    }
    _getNextToken(current) {
        let char = '';
        const token = current;
        token.reset();
        do {
            char = this._skipWhitespace();
            if (char === '/' && this._peekChar() === '/') {
                char = this._skipComment0();
            }
            else if (char === '/' && this._peekChar() === '*') {
                char = this._skipComment1();
            }
            else if (this._isDigit(char) || char === '-') {
                this._ungetChar();
                this._getNumber(token);
                return true;
            }
            else if (char === '\"' || char === '\'') {
                this._getSubstring(token, char);
                return true;
            }
            else if (char.length) {
                this._ungetChar();
                this._getString(token);
                return true;
            }
        } while (char.length);
        return false;
    }
    _skipComment0() {
        let char = '';
        do {
            char = this._getChar();
        } while (char.length && char !== '\n');
        return char;
    }
    _skipComment1() {
        let char = '';
        do {
            char = this._getChar();
        } while (char.length && !(char === '*' && this._peekChar() === '/'));
        char = this._getChar();
        return char;
    }
    _getNumber(token) {
        let val = 0.0;
        let isFloat = false;
        let scaleValue = 0.1;
        let char = this._getChar();
        let isNegate = char === '-';
        let ascii0 = '0'.charCodeAt(0);
        let consumed = false;
        do {
            token.addChar(char);
            if (char === '.') {
                isFloat = true;
            }
            else if (char !== '-') {
                let ascii = char.charCodeAt(0);
                let vc = ascii - ascii0;
                if (!isFloat) {
                    val = val * 10 + vc;
                }
                else {
                    val = val + vc * scaleValue;
                    scaleValue *= 0.1;
                }
            }
            if (consumed) {
                this._getChar();
            }
            char = this._peekChar();
            consumed = true;
        } while (char.length && (this._isDigit(char) || (!isFloat && char === '.')));
        if (isNegate) {
            val = -val;
        }
        token.setVal(val);
        token.setType(ETokenType.NUMBER);
    }
    _getSubstring(token, endChar) {
        let end = false;
        let char = '';
        token.setType(ETokenType.STRING);
        do {
            char = this._getChar();
            if (char === endChar) {
                end = true;
            }
            else {
                token.addChar(char);
            }
        } while (char.length && !end);
    }
    _isSpecialChar(char) {
        switch (char) {
            case '(':
                return true;
            case ')':
                return true;
            case '[':
                return true;
            case ']':
                return true;
            case '{':
                return true;
            case '}':
                return true;
            case ',':
                return true;
            case '.':
                return true;
        }
        return false;
    }
    _getString(token) {
        let char = this._getChar();
        token.setType(ETokenType.STRING);
        do {
            token.addChar(char);
            if (!this._isSpecialChar(char)) {
                char = this._getChar();
            }
        } while (char.length && !this._isWhitespace(char) && !this._isSpecialChar(char));
    }
    _skipWhitespace() {
        let char = '';
        do {
            char = this._getChar();
        } while (char.length && this._isWhitespace(char));
        return char;
    }
    _ungetChar() {
        if (this._currIdx) {
            this._currIdx--;
        }
    }
    _getChar() {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx++];
        }
        return '';
    }
    _peekChar() {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx];
        }
        return '';
    }
}
