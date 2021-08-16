export type Modify<T, R> = Omit<T, keyof R> & R;
export interface IError extends Error {
  statusCode?: number;
}
