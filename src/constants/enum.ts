export enum ResponseStatus {
  SUCCESS = "success",
  Error = "error",
}
export enum Action {
  ADD,
  Edit,
  DELETE,
}

export enum LoaderType {
  PROGRESS,
  SPINNER
}

export enum AxiosErrorCode {
  TIMEOUT='ECONNABORTED',
  SERVER_ERROR= 'ERR_NETWORK',
};
export enum BtnSize {
  SM= 'sm',
  WIDE= 'wide',
  FULL= 'full',
};

export enum InputText {
  TEXT= 'text',
  EMAIL= 'email',
  TITLE= 'title',
  CONTENT= 'content',
}

export enum ButtonDir {
  PREV= 'prev',
  NEXT= 'next',
}