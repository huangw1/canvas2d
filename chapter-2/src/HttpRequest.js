"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:15
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HttpRequest {
    static doGet(url, callback, responseType = 'text') {
        const xhr = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = { success: true, responseType: responseType, response: xhr.response };
                callback(response);
            }
            else {
                const response = { success: false, responseType: responseType, response: null };
                callback(response);
            }
        };
        xhr.open('get', url, true);
        xhr.send();
    }
}
exports.HttpRequest = HttpRequest;
