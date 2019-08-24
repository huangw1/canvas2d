/**
 * @Author: huangw1
 * @Date: 2019/8/22 13:10
 */

export interface IEnumerator<T> {
    reset(): void,

    moveNext(): boolean,

    readonly current: T | undefined
}

export interface IEnumerable<T> {
    getEnumerator(): IEnumerator<T>
}
