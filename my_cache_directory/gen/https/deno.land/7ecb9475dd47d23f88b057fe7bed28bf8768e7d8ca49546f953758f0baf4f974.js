// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import * as base64 from "../../encoding/base64.ts";
import * as base64url from "../../encoding/base64url.ts";
export function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        byteArray.push(str.charCodeAt(i) & 255);
    }
    return new Uint8Array(byteArray);
}
export function base64ToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("-", "+").replaceAll("_", "/");
    return base64.decode(str);
}
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, std/base64 does not
    str = str.trim().replace(INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), std/base64 does not
    while(str.length % 4 !== 0){
        str = str + "=";
    }
    return str;
}
export function base64UrlToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("+", "-").replaceAll("/", "_");
    return base64url.decode(str);
}
export function hexToBytes(str) {
    const byteArray = new Uint8Array(Math.floor((str || "").length / 2));
    let i;
    for(i = 0; i < byteArray.length; i++){
        const a = Number.parseInt(str[i * 2], 16);
        const b = Number.parseInt(str[i * 2 + 1], 16);
        if (Number.isNaN(a) && Number.isNaN(b)) {
            break;
        }
        byteArray[i] = a << 4 | b;
    }
    return new Uint8Array(i === byteArray.length ? byteArray : byteArray.slice(0, i));
}
export function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) {
            break;
        }
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return new Uint8Array(byteArray);
}
export function bytesToAscii(bytes) {
    let ret = "";
    for(let i = 0; i < bytes.length; ++i){
        ret += String.fromCharCode(bytes[i] & 127);
    }
    return ret;
}
export function bytesToUtf16le(bytes) {
    let res = "";
    for(let i = 0; i < bytes.length - 1; i += 2){
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE3NS4wL25vZGUvaW50ZXJuYWxfYmluZGluZy9fdXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tIFwiLi4vLi4vZW5jb2RpbmcvYmFzZTY0LnRzXCI7XG5pbXBvcnQgKiBhcyBiYXNlNjR1cmwgZnJvbSBcIi4uLy4uL2VuY29kaW5nL2Jhc2U2NHVybC50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNjaWlUb0J5dGVzKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMjU1KTtcbiAgfVxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnl0ZUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMoc3RyOiBzdHJpbmcpIHtcbiAgc3RyID0gYmFzZTY0Y2xlYW4oc3RyKTtcbiAgc3RyID0gc3RyLnJlcGxhY2VBbGwoXCItXCIsIFwiK1wiKS5yZXBsYWNlQWxsKFwiX1wiLCBcIi9cIik7XG4gIHJldHVybiBiYXNlNjQuZGVjb2RlKHN0cik7XG59XG5cbmNvbnN0IElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZztcbmZ1bmN0aW9uIGJhc2U2NGNsZWFuKHN0cjogc3RyaW5nKSB7XG4gIC8vIE5vZGUgdGFrZXMgZXF1YWwgc2lnbnMgYXMgZW5kIG9mIHRoZSBCYXNlNjQgZW5jb2RpbmdcbiAgc3RyID0gc3RyLnNwbGl0KFwiPVwiKVswXTtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgc3RkL2Jhc2U2NCBkb2VzIG5vdFxuICBzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsIFwiXCIpO1xuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIHN0ZC9iYXNlNjQgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgXCI9XCI7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFVybFRvQnl0ZXMoc3RyOiBzdHJpbmcpIHtcbiAgc3RyID0gYmFzZTY0Y2xlYW4oc3RyKTtcbiAgc3RyID0gc3RyLnJlcGxhY2VBbGwoXCIrXCIsIFwiLVwiKS5yZXBsYWNlQWxsKFwiL1wiLCBcIl9cIik7XG4gIHJldHVybiBiYXNlNjR1cmwuZGVjb2RlKHN0cik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb0J5dGVzKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KE1hdGguZmxvb3IoKHN0ciB8fCBcIlwiKS5sZW5ndGggLyAyKSk7XG4gIGxldCBpO1xuICBmb3IgKGkgPSAwOyBpIDwgYnl0ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYSA9IE51bWJlci5wYXJzZUludChzdHJbaSAqIDJdLCAxNik7XG4gICAgY29uc3QgYiA9IE51bWJlci5wYXJzZUludChzdHJbaSAqIDIgKyAxXSwgMTYpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYSkgJiYgTnVtYmVyLmlzTmFOKGIpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgYnl0ZUFycmF5W2ldID0gKGEgPDwgNCkgfCBiO1xuICB9XG4gIHJldHVybiBuZXcgVWludDhBcnJheShcbiAgICBpID09PSBieXRlQXJyYXkubGVuZ3RoID8gYnl0ZUFycmF5IDogYnl0ZUFycmF5LnNsaWNlKDAsIGkpLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMoc3RyOiBzdHJpbmcsIHVuaXRzOiBudW1iZXIpIHtcbiAgbGV0IGMsIGhpLCBsbztcbiAgY29uc3QgYnl0ZUFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGkgPSBjID4+IDg7XG4gICAgbG8gPSBjICUgMjU2O1xuICAgIGJ5dGVBcnJheS5wdXNoKGxvKTtcbiAgICBieXRlQXJyYXkucHVzaChoaSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ5dGVBcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBieXRlc1RvQXNjaWkoYnl0ZXM6IFVpbnQ4QXJyYXkpIHtcbiAgbGV0IHJldCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSAmIDEyNyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9VdGYxNmxlKGJ5dGVzOiBVaW50OEFycmF5KSB7XG4gIGxldCByZXMgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGlu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