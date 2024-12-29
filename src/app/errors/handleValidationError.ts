import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorRespons } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorRespons => {
  const error: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path || '', // Fallback to an empty string if `path` is undefined
        message: val?.message || 'An error occurred', // Fallback message
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error.',
    error,
  };
};

export default handleValidationError;
