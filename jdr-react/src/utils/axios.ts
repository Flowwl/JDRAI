import { ApiError, ApiErrorType } from "./apiError";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as qs from "qs";

type AxiosRequestCustomConfig = AxiosRequestConfig & {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body: Record<string, unknown>;
  headers: Record<string, string>;
  params: Record<string, unknown>;
  withCredentials: boolean;
};
export const request = async <T>(customConfig: Partial<AxiosRequestCustomConfig> = {}): Promise<T> => {
  const { path, body, headers, params } = customConfig;
  const apiHeaders = { "content-type": "application/json", ...headers };
  return axios
    .request<T>({
      url: `${process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_API_URL}${
        process.env.REACT_APP_API_BASE_PATH
      }${path}`,
      headers: {
        "Content-type": "application/json",
        ...apiHeaders
      },
      data: body && JSON.stringify(body),
      params: params,
      paramsSerializer: (parameters) => qs.stringify(parameters, { encode: false }),
      timeout: undefined,
      withCredentials: false,
      ...customConfig
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError<ApiErrorType>) => {
      return Promise.reject(new ApiError(err.response?.data, err.response?.status));
    });
};
