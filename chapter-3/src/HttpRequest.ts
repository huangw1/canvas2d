/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:15
 */

export interface HttpResponse {
    success: boolean,
    response: any,
    responseType: XMLHttpRequestResponseType
}

export class HttpRequest {
    public static doGet(url: string, callback: (response: HttpResponse) => void, responseType: XMLHttpRequestResponseType = 'text') {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response: HttpResponse = {success: true, responseType: responseType, response: xhr.response};
                callback(response);
            } else {
                const response: HttpResponse = {success: false, responseType: responseType, response: null};
                callback(response);
            }
        };
        xhr.open('get', url, true);
        xhr.send();
    }
}
