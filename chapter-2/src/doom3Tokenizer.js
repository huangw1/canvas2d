"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:25
 */
exports.__esModule = true;
var ETokenType;
(function (ETokenType) {
    ETokenType[ETokenType["NONE"] = 0] = "NONE";
    ETokenType[ETokenType["STRING"] = 1] = "STRING";
    ETokenType[ETokenType["NUMBER"] = 2] = "NUMBER";
})(ETokenType = exports.ETokenType || (exports.ETokenType = {}));
var Doom3Token = /** @class */ (function () {
    function Doom3Token() {
        this._charArr = [];
        this.reset();
    }
    Doom3Token.prototype.reset = function () {
        this._val = 0.0;
        this._charArr = [];
        this._type = ETokenType.NONE;
    };
    Object.defineProperty(Doom3Token.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Doom3Token.prototype.getFloat = function () {
        return this._val;
    };
    Doom3Token.prototype.getInt = function () {
        return parseInt(this._val.toString(), 10);
    };
    Doom3Token.prototype.getString = function () {
        return this._charArr.join('');
    };
    Doom3Token.prototype.isString = function (str) {
        if (str.length !== this._charArr.length) {
            return false;
        }
        return this._charArr.join('') === str;
    };
    Doom3Token.prototype.addChar = function (c) {
        this._charArr.push(c);
    };
    Doom3Token.prototype.setVal = function (num) {
        this._val = num;
    };
    Doom3Token.prototype.setType = function (type) {
        this._type = type;
    };
    return Doom3Token;
}());
var Doom3Factory = /** @class */ (function () {
    function Doom3Factory() {
    }
    Doom3Factory.createDoom3Tokenizer = function () {
        return new Doom3Tokenizer();
    };
    return Doom3Factory;
}());
exports.Doom3Factory = Doom3Factory;
var Doom3Tokenizer = /** @class */ (function () {
    function Doom3Tokenizer() {
        this._whitespaces = [' ', '\t', '\v', '\n', '\r'];
        this._digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this._current = new Doom3Token();
    }
    Doom3Tokenizer.prototype._isWhitespace = function (char) {
        return this._whitespaces.indexOf(char) !== -1;
    };
    Doom3Tokenizer.prototype._isDigit = function (char) {
        return this._digits.indexOf(char) !== -1;
    };
    Doom3Tokenizer.prototype.setSource = function (source) {
        this._source = source;
        this._currIdx = 0;
    };
    Doom3Tokenizer.prototype.reset = function () {
        this._currIdx = 0;
    };
    Object.defineProperty(Doom3Tokenizer.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Doom3Tokenizer.prototype.moveNext = function () {
        return this._getNextToken(this._current);
    };
    Doom3Tokenizer.prototype._getNextToken = function (current) {
        var char = '';
        var token = current;
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
    };
    Doom3Tokenizer.prototype._skipComment0 = function () {
        var char = '';
        do {
            char = this._getChar();
        } while (char.length && char !== '\n');
        return char;
    };
    Doom3Tokenizer.prototype._skipComment1 = function () {
        var char = '';
        do {
            char = this._getChar();
        } while (char.length && !(char === '*' && this._peekChar() === '/'));
        char = this._getChar();
        return char;
    };
    Doom3Tokenizer.prototype._getNumber = function (token) {
        var val = 0.0;
        var isFloat = false;
        var scaleValue = 0.1;
        var char = this._getChar();
        var isNegate = char === '-';
        var ascii0 = '0'.charCodeAt(0);
        var consumed = false;
        do {
            token.addChar(char);
            if (char === '.') {
                isFloat = true;
            }
            else if (char !== '-') {
                var ascii = char.charCodeAt(0);
                var vc = ascii - ascii0;
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
    };
    Doom3Tokenizer.prototype._getSubstring = function (token, endChar) {
        var end = false;
        var char = '';
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
    };
    Doom3Tokenizer.prototype._isSpecialChar = function (char) {
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
    };
    Doom3Tokenizer.prototype._getString = function (token) {
        var char = this._getChar();
        token.setType(ETokenType.STRING);
        do {
            token.addChar(char);
            if (!this._isSpecialChar(char)) {
                char = this._getChar();
            }
        } while (char.length && !this._isWhitespace(char) && !this._isSpecialChar(char));
    };
    Doom3Tokenizer.prototype._skipWhitespace = function () {
        var char = '';
        do {
            char = this._getChar();
        } while (char.length && this._isWhitespace(char));
        return char;
    };
    Doom3Tokenizer.prototype._ungetChar = function () {
        if (this._currIdx) {
            this._currIdx--;
        }
    };
    Doom3Tokenizer.prototype._getChar = function () {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx++];
        }
        return '';
    };
    Doom3Tokenizer.prototype._peekChar = function () {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx];
        }
        return '';
    };
    return Doom3Tokenizer;
}());
