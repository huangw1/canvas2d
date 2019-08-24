/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:25
 */

import {IEnumerator} from './IEnumerator';

export enum ETokenType {
    NONE,
    STRING,
    NUMBER
}

export interface IDoom3Token {

    readonly type: ETokenType,

    reset(): void,

    isString(str: string): boolean,

    getString(): string,

    getFloat(): number,

    getInt(): number
}

class Doom3Token implements IDoom3Token {
    private _type!: ETokenType;

    private _charArr: string[] = [];

    private _val!: number;

    public constructor() {
        this.reset()
    }

    public reset(): void {
        this._val = 0.0;
        this._charArr = [];
        this._type = ETokenType.NONE;
    }

    public get type() {
        return this._type
    }

    public getFloat(): number {
        return this._val;
    }

    public getInt(): number {
        return parseInt(this._val.toString(), 10);
    }

    public getString(): string {
        return this._charArr.join('');
    }

    public isString(str: string): boolean {
        if (str.length !== this._charArr.length) {
            return false
        }
        return this._charArr.join('') === str;
    }

    public addChar(c: string): void {
        this._charArr.push(c);
    }

    public setVal(num: number): void {
        this._val = num;
    }

    public setType(type: ETokenType): void {
        this._type = type;
    }
}

export interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
    setSource(source: string): void
}

export class Doom3Factory {
    public static createDoom3Tokenizer(): IDoom3Tokenizer {
        return new Doom3Tokenizer();
    }
}

class Doom3Tokenizer implements IDoom3Tokenizer {
    private _whitespaces: string[] = [' ', '\t', '\v', '\n', '\r'];

    private _digits: string [ ] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    private _isWhitespace(char: string): boolean {
        return this._whitespaces.indexOf(char) !== -1
    }

    private _isDigit(char: string): boolean {
        return this._digits.indexOf(char) !== -1
    }

    private _source!: string;

    private _currIdx!: number;

    public setSource(source: string): void {
        this._source = source;
        this._currIdx = 0;
    }

    public reset(): void {
        this._currIdx = 0
    }

    private _current: IDoom3Token = new Doom3Token();

    public get current() {
        return this._current
    }

    public moveNext(): boolean {
        return this._getNextToken(this._current);
    }

    private _getNextToken(current: IDoom3Token): boolean {
        let char: string = '';
        const token: Doom3Token = current as Doom3Token;
        token.reset();
        do {
            char = this._skipWhitespace();
            if (char === '/' && this._peekChar() === '/') {
                char = this._skipComment0()
            } else if (char === '/' && this._peekChar() === '*') {
                char = this._skipComment1()
            } else if (this._isDigit(char) || char === '-') {
                this._ungetChar();
                this._getNumber(token);
                return true
            } else if (char === '\"' || char === '\'') {
                this._getSubstring(token, char);
                return true
            } else if (char.length) {
                this._ungetChar();
                this._getString(token);
                return true;
            }
        } while (char.length);
        return false
    }

    private _skipComment0(): string {
        let char: string = '';
        do {
            char = this._getChar();
        } while (char.length && char !== '\n');
        return char
    }

    private _skipComment1() {
        let char: string = '';
        do {
            char = this._getChar();
        } while (char.length && !(char === '*' && this._peekChar() === '/'));
        char = this._getChar();
        return char
    }

    private _getNumber(token: Doom3Token) {
        let val: number = 0.0;
        let isFloat: boolean = false;
        let scaleValue: number = 0.1;
        let char: string = this._getChar();
        let isNegate: boolean = char === '-';
        let ascii0: number = '0'.charCodeAt(0);
        let consumed: boolean = false;

        do {
            token.addChar(char);
            if (char === '.') {
                isFloat = true;
            } else if (char !== '-') {
                let ascii: number = char.charCodeAt(0);
                let vc = ascii - ascii0;
                if (!isFloat) {
                    val = val * 10 + vc;
                } else {
                    val  = val + vc * scaleValue;
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
            val = -val
        }
        token.setVal(val);
        token.setType(ETokenType.NUMBER);
    }

    private _getSubstring(token: Doom3Token, endChar: string) {
        let end: boolean = false;
        let char: string = '';
        token.setType(ETokenType.STRING);
        do {
            char = this._getChar();
            if (char === endChar) {
                end = true
            } else {
                token.addChar(char)
            }
        } while (char.length && !end)
    }

    private _isSpecialChar (char: string): boolean {
        switch (char) {
            case '(' :
                return true;
            case ')' :
                return true;
            case '[' :
                return true;
            case ']' :
                return true;
            case '{' :
                return true;
            case '}' :
                return true;
            case ',' :
                return true;
            case '.' :
                return true;

        }
        return false;
    }

    private _getString (token: Doom3Token) {
        let char: string = this._getChar();
        token.setType(ETokenType.STRING);
        do {
            token.addChar(char);
            if (!this._isSpecialChar(char)) {
                char = this._getChar()
            }
        } while (char.length && !this._isWhitespace(char) && !this._isSpecialChar(char))
    }

    private _skipWhitespace(): string {
        let char: string = '';
        do {
            char = this._getChar();
        } while (char.length && this._isWhitespace(char));
        return char
    }

    private _ungetChar () {
        if (this._currIdx) {
            this._currIdx--
        }
    }

    private _getChar(): string {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx++]
        }
        return ''
    }

    private _peekChar(): string {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source[this._currIdx]
        }
        return ''
    }
}
