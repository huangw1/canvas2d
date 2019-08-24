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
    public static doGet(url: string, callback: (response: HttpResponse) => void) {

    }
}
