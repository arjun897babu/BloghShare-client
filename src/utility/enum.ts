export enum ResponseStatus {
  SUCCESS = "success",
  Error = "error",
}
export enum Action {
  ADD,
  Edit,
  DELETE,
}

export enum AxiosErrorCode {
  timeout = 'ECONNABORTED',
  serverError = 'ERR_NETWORK'
}
