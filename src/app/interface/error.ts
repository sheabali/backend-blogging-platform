export type TErrorSources = { path: string | number; message: string }[];

export type TGenericErrorRespons = {
  statusCode: number;
  message: string;
  error: TErrorSources;
};
