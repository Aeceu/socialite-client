import { AxiosError, AxiosResponse } from "axios";

/* 
GENERIC TYPEs
T = what type is the params (what type are the params)
V = what type is the return (what type are you expecting) 
*/

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

/*
T = what types are the parameter
V = what types are returning from request (V if success)
E = what types are return from request (E if error)

*/

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): BaseResponse<V, E> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (e) {
      return { code: "error", error: e as E };
    }
  };
