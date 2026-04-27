export interface TypedResponse<T> {
  success: boolean;
  data: T;
  error: string;
}
