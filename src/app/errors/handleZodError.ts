import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorRespons } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorRespons => {
  const error: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] || '',
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error.',
    error,
  };
};

export default handleZodError;
