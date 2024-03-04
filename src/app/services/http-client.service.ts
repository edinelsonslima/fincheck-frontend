import { enLocalStorage } from "@enums/local-storage.enum";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
  constructor(private readonly _axios: AxiosInstance) {}

  public get<TData = unknown, TBody = unknown>(
    url: string,
    config?: AxiosRequestConfig<TBody>
  ) {
    return this.request<TData, TBody>({ ...config, url, method: "GET" });
  }

  public post<TData = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) {
    return this.request<TData, TBody>({ ...config, url, data, method: "POST" });
  }

  public put<TData = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) {
    return this.request<TData, TBody>({ ...config, url, data, method: "PUT" });
  }

  public delete<TData = unknown, TBody = unknown>(
    url: string,
    config?: AxiosRequestConfig<TBody>
  ) {
    return this.request<TData, TBody>({ ...config, url, method: "DELETE" });
  }

  private request<TData = unknown, TBody = unknown>({
    headers,
    ...config
  }: AxiosRequestConfig<TBody>) {
    return this._axios.request<TData, AxiosResponse<TData, TBody>, TBody>({
      ...config,
      headers: { ...headers, Authorization: `Bearer ${this.getAccessToken()}` },
    });
  }

  private getAccessToken() {
    const accessToken = localStorage.getItem(enLocalStorage.ACCESS_TOKEN);
    return accessToken ? JSON.parse(accessToken) : "";
  }
}

export { HttpClient };
export default new HttpClient(
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
);
