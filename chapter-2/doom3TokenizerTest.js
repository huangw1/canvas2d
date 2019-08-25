"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/24 11:31
 */
Object.defineProperty(exports, "__esModule", { value: true });
const doom3Tokenizer_1 = require("./src/doom3Tokenizer");
const doom3Tokenizer = doom3Tokenizer_1.Doom3Factory.createDoom3Tokenizer();
doom3Tokenizer.setSource(`
mapProcFile003

model { /* name = */ "_area0" /* numSurfaces = */ 4

/* surface 0 */ { "wood_1" /* numVerts = */ 191 /* numIndexes = */ 306
( 2250 -1410 18 18.078125 -0.140625 0 -1 0 ) ( 2250 -1410 8 18.078125 -0.0625 0 -1 0 ) ( 2248 -1410 18 18.0625 -0.140625 0 -1 0 ) 
( 2248 -1410 8 18.0625 -0.0625 0 -1 0 ) ( 2248 -1470 18 -17.0625 -0.140625 0 1 0 ) ( 2248 -1470 8 -17.0625 -0.0625 0 1 0 ) 
`);
while (doom3Tokenizer.moveNext()) {
    if (!doom3Tokenizer.current) {
        continue;
    }
    if (doom3Tokenizer.current.type === doom3Tokenizer_1.ETokenType.NUMBER) {
        console.log(" NUMBER : " + doom3Tokenizer.current.getFloat());
    }
    else {
        console.log(" STRING : " + doom3Tokenizer.current.getString());
    }
}
